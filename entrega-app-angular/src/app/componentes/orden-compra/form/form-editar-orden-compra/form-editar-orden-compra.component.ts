import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdenCompraService } from 'src/app/services/orden-de-compra/orden-compra.service';
import { ProductosService } from 'src/app/services/producto/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';

@Component({
  selector: 'app-form-editar-orden-compra',
  templateUrl: './form-editar-orden-compra.component.html',
  styleUrls: ['./form-editar-orden-compra.component.css']
})
export class FormEditarOrdenCompraComponent implements OnInit {
  idNuevo: any;
  orden: any;
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
  noContieneProductos: boolean = false
  detalles: any = []
  suma = 0;
  sumaPorProducto = 0;
  private modalService = inject(NgbModal);
  listaAlldetail: any = []
  listProductTableDetalles: any = []
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
    private serviceProduct: ProductosService,
    private _activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idNuevo = this._activateRoute.snapshot.paramMap.get('id');
    this.getOrderById()
    this.getListadProveedores()
    this.getListadProductos()
    this.getNumeroDeOrdenes()
  }

  getOrderById() {
    this.serviceOrdenCompra.getById(this.idNuevo).subscribe((data: any) => {
      this.orden = data
      this.numeroOrden = this.orden.numeroOrden
      this.fechaEntrega = this.orden.fechaDeEntrega;
      this.direccion = this.orden.ordenDireccion;
      this.proveedor = this.orden.proveedorId.nombreProveedor;
      this.informacionRecepcion = this.orden.ordenInformacionRecepcion
      //this.producto = this.orden.producto;
      // this.cantidad = this.orden.cantidad;
      // this.arrayCantidad = this.orden.arrayCantidad;
      this.imagenLogo = this.orden.proveedorId.imagen
      this.listProductTable = this.orden.detalles;
      console.log(this.orden)
      //-------------------------------------------------------
      for (let i = 0; i < this.orden.detalles.length; i++) {
        let detalle = {
          detalleCantidad: parseInt(this.orden.detalles[i].detalleCantidad),
          productosId: this.orden.detalles[i].productosId.id
        }
        this.detalles.push(detalle)
      }

      this.suma = this.orden.total
    })
  }
  AgregarProducto() {

    let product = this.listadoProductos.filter((prod: any) => prod.nombreProducto == this.producto)
    this.listProductTableDetalles.push(product[0])

    this.listProductTable.push({
      detalleCantidad: parseInt(this.cantidad),
      productosId: product[0]
    })

    if (this.listProductTable.length > 0) {
      this.noContieneProductos = false
    }


    this.detalles.push({
      detalleCantidad: this.cantidad,
      productosId: product[0].id
    })

    this.suma += product[0].precio * parseInt(this.cantidad);
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
    this.detalles = []
    this.fechaEntrega = ""
    this.listProductTable = []
    this.arrayCantidad = []
    this.cantidad = "0";
    this.producto = ""
    this.suma = 0;
    this.listadoProductos = []
    this.noContieneProductos = true
    this.imagenLogo = "";
    this.loader = true;
    this.logo = false;
    this.listProductTableDetalles = []


    this.detalles = []
    this.listProductTable = []
    this.listadoProductos = []
    this.arrayCantidad = []
    this.noContieneProductos = true
    this.producto = "";
    this.loader = false;
    this.logo = true;
    this.getListadProductos()
  }
  numeroOrdenChange(evento: any) {
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
    if (!evento || parseInt(evento) < 1) {
      this.cantidadInvalida = true;
    } else {
      this.cantidadInvalida = false;
    }
  }


  limpiar() {
    this.detalles = []
    this.fechaEntrega = ""
    this.listProductTable = []
    this.arrayCantidad = []
    this.cantidad = "";
    this.producto = ""
    this.proveedor = "";
    this.suma = 0;
    this.listadoProductos = []
    this.noContieneProductos = true
    this.imagenLogo = "";
    this.loader = true;
    this.logo = false;
    this.listProductTableDetalles = []
  }


  formularioValidado(): boolean {
    //buscar nunmero de orden

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

      for (let j = 0; j < this.detalles.length; j++) {
        let detalleEnvio = {
          detalleCantidad: this.detalles[j].detalleCantidad,
          productosId: {
            id: this.detalles[j].productosId
          }
        }
        this.listaAlldetail.push(detalleEnvio)
      }


      let objectEnviar = {
        ordenDireccion: this.direccion,
        ordenInformacionRecepcion: this.informacionRecepcion,
        total: this.suma,
        habilitado: true,
        fechaDeEntrega: this.fechaEntrega,
        proveedorId: {
          id: this.idProveedor[0].id
        },
        estadoId: {
          id: 2
        },
        detalles: this.listaAlldetail
      }
      let objectCompare = {
        ordenDireccion: this.orden.ordenDireccion,
        ordenInformacionRecepcion: this.orden.ordenInformacionRecepcion,
        total: this.orden.total,
        habilitado: true,
        fechaDeEntrega: this.orden.fechaDeEntrega,
        proveedorId: {
          id: this.orden.proveedorId.id
        },
        estadoId: {
          id: this.orden.estadoId.id
        },
        detalles: this.listaAlldetail
      }


      console.log(objectEnviar)
      this.serviceOrdenCompra.put(objectEnviar, this.idNuevo).subscribe(data => {
        this.route.navigate(['/', 'orden-compra'])
      }, (error => {
        this.route.navigate(['/', 'orden-compra'])
        console.log("-------------")
      }))
      /*if (!(objectEnviar.proveedorId.id === objectCompare.proveedorId.id &&
        objectEnviar.ordenDireccion == objectCompare.ordenDireccion &&
        objectEnviar.ordenInformacionRecepcion === objectCompare.ordenInformacionRecepcion &&
        objectEnviar.total == objectCompare.total &&
        objectEnviar.fechaDeEntrega == objectCompare.fechaDeEntrega &&
        objectEnviar.detalles == objectCompare.detalles)) {

        //this.openScrollableContent(longContent)

        this.serviceOrdenCompra.put(objectEnviar, this.idNuevo).subscribe(data => {
          this.route.navigate(['/', 'orden-compra'])
        }, (error => {
          this.route.navigate(['/', 'orden-compra'])
        }))

      } else {
        this.botondisable = true;
      }*/
    }
    this.botondisable = true;
  }
}
