import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdenCompraService } from 'src/app/services/orden-de-compra/orden-compra.service';
import { ProductosService } from 'src/app/services/producto/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';

@Component({
  selector: 'app-form-agregar-orden-compra',
  templateUrl: './form-agregar-orden-compra.component.html',
  styleUrls: ['./form-agregar-orden-compra.component.css']
})
export class FormAgregarOrdenCompraComponent implements OnInit {
  numeroOrden = ""
  fechaEntrega = "";
  direccion = "";
  proveedor = "";
  informacionRecepcion = ""
  producto = "";
  cantidad = "";
  arrayCantidad: any = [];
  imagenLogo = ""

  fechaInvalido: boolean = false;
  proveedorInvalido: boolean = false;
  productosInvalidos: boolean = false
  informacionRecepcionInvalida: boolean = false;
  direccionInvalida: boolean = false
  cantidadInvalida: boolean = false;
  botondisable: boolean = false;
  botonAble: boolean = false;
  loader: boolean = true;
  logo: boolean = false;
  numeroOrdenInvalido: boolean = false;
  ordenRepetida: boolean = false;

  idProveedor: any = 0;
  listProductTable: any = [];
  noContieneProductos: boolean = true
  detalles: any = []
  suma = 0;
  private modalService = inject(NgbModal);

  ordenDeCompras: any = []
  listadoProductos: any = []
  listadoProductosNombre: any = []
  listadoProveedores: any = []
  listadoProveedoresNombreCompletos: any = [];
  listadoFilterProveedoresNombreCompletos: any;
  productosDisponiblesNombres: any = [];
  listadoNombresJoinApellido: any = [];
  productosDisponibles: any = []
  proveedorValido: boolean = false;
  precioPrueba: any = 25;

  constructor(
    private serviceOrdenCompra: OrdenCompraService,
    private route: Router,
    private serviceProveedor: ProveedoresService,
    private serviceProduct: ProductosService) { }

  ngOnInit(): void {
    this.getListadProveedores()
    this.getListadProductos()
    this.getNumeroDeOrdenes()
  }

  openScrollableContent(longContent: TemplateRef<any>) {
    //console.log("Estoy haciendo notificacion")
    this.modalService.open(longContent, { scrollable: true });
  }

  getListadProveedores() {
    this.serviceProveedor.get().subscribe((data: any) => {
      this.listadoProveedores = data;
      this.listadoProveedores = this.listadoProveedores.filter((p: any) => p.deleteAt == false)
    })
  }

  getListadProductos() {
    this.serviceProduct.get().subscribe((data: any) => {
      this.listadoProductos = data
      this.listadoProductos = this.listadoProductos.filter((pro: any) => pro.proveedorId.nombreProveedor == this.proveedor)
      this.imagenLogo = this.listadoProductos[0].proveedorId.imagen;
    })
  }
  getNumeroDeOrdenes() {
    this.serviceOrdenCompra.get().subscribe((data) => {
      this.ordenDeCompras = data.map((d: any) => d.numeroOrden)
    })
  }
  proveedorChange(valor: any) {
    this.listProductTable = []
    this.listadoProductos = []
    this.arrayCantidad = []
    this.cantidad = "0"
    this.noContieneProductos = true
    this.producto = "";
    this.loader = false;
    this.logo = true;
    this.getListadProductos()
  }
  numeroOrdenChange(evento: any) {
    console.log(evento)
    if (evento.length < 3) {
      this.numeroOrdenInvalido = true;
    }
    if (this.ordenDeCompras.includes(evento)) {
      this.ordenRepetida = true;
    }
    if (evento.length >= 3 && !this.ordenDeCompras.includes(evento)) {
      this.numeroOrdenInvalido = false;
      this.ordenRepetida = false;
    }
  }
  direccionChange(evento: any) {
    if (evento.length < 5) {
      this.direccionInvalida = true
    } else {
      this.direccionInvalida = false
    }
  }
  informacionDireccionChange(evento: any) {
    if (evento.length < 15) {
      this.informacionRecepcionInvalida = true
    } else {
      this.informacionRecepcionInvalida = false
    }
  }
  cantidadChange(evento: any) {
    if (!evento||parseInt(evento) < 1) {
      this.cantidadInvalida = true;
    } else {
      this.cantidadInvalida = false;
    }
  }

  AgregarProducto() {
    let product = this.listadoProductos.filter((prod: any) => prod.nombreProducto == this.producto)
    this.listProductTable.push(product[0])

    if (this.listProductTable.length > 0) {
      this.noContieneProductos = false
    }

    this.arrayCantidad.push(this.cantidad)
    this.suma = 0;

    for (let i = 0; i < this.listProductTable.length; i++) {
      this.suma += this.listProductTable[i].precio * parseInt(this.arrayCantidad[i]);
    }
  }

  limpiar() {
    this.fechaEntrega = ""
    this.listProductTable = []
    this.arrayCantidad = []
    this.cantidad = "";
    this.producto = ""
    this.proveedor = "";
    this.suma = 0;
    this.listadoProductos = []
    this.imagenLogo = "";
    this.loader = true;
    this.logo = false;
  }


  formularioValidado(): boolean {
    //buscar nunmero de orden


    if (!this.numeroOrden) {
      this.numeroOrdenInvalido = true;
      return false;
    }

    if (this.ordenDeCompras.includes(this.numeroOrden)) {
      this.ordenRepetida = true;
      return false;
    }

    if (!this.fechaEntrega) {
      this.fechaInvalido = true;
      return false;
    }
    if (!this.proveedor) {
      this.botondisable = true;
      this.fechaInvalido = false;
      this.proveedorInvalido = true;
      return false;
    }
    if (parseInt(this.cantidad) == 0) {
      this.proveedorInvalido = false;
      this.cantidadInvalida = true;
      return false;
    }
    if (this.listProductTable.length < 1) {
      this.cantidadInvalida = false;
      this.productosInvalidos = true;
      return false;
    }
    if (!this.informacionRecepcion || this.informacionRecepcion.length < 15) {
      this.productosInvalidos = false;
      this.informacionRecepcionInvalida = true
      return false;
    }
    if (!this.direccion || this.direccion.length < 5) {
      this.informacionRecepcionInvalida = false
      this.direccionInvalida = true
      return false;
    }

    this.direccionInvalida = false
    return true;
  }


  enviar(form: any, longContent: TemplateRef<any>) {
    if (this.formularioValidado()) {
      this.botondisable = false;
      this.idProveedor = this.listadoProveedores.filter((prove: any) => prove.nombreProveedor == this.proveedor)
      let suma = 0;

      for (let i = 0; i < this.listProductTable.length; i++) {
        suma += this.listProductTable[i].precio * parseInt(this.arrayCantidad[i]);
        let detalle = {
          detalleCantidad: parseInt(this.arrayCantidad[i]),
          productosId: {
            id: this.listProductTable[i].id
          }
        }
        this.detalles.push(detalle)
      }

      let objectEnviar = {
        numeroOrden: this.numeroOrden,
        ordenDireccion: this.direccion,
        ordenInformacionRecepcion: this.informacionRecepcion,
        total: suma,
        habilitado: true,
        fechaDeEntrega: this.fechaEntrega,
        proveedorId: {
          id: this.idProveedor[0].id
        },
        estadoId: {
          id: 2
        },
        detalles: this.detalles
      }
      this.openScrollableContent(longContent)
      this.serviceOrdenCompra.post(objectEnviar).subscribe(data => {
        console.log(data)
        this.route.navigate(['/', 'orden-compra'])

      }, (error => {
        console.log("Fijate igual xd")
        this.route.navigate(['/', 'orden-compra'])
      }))
    }
    this.botondisable = true;
    console.log("No se envia, falta datos ")
  }
}
