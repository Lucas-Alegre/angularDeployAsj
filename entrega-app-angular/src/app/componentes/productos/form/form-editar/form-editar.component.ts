import { Component, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from 'src/app/services/categoria/categorias.service';
import { ProductosService } from 'src/app/services/producto/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';


@Component({
  selector: 'app-form-editar',
  templateUrl: './form-editar.component.html',
  styleUrls: ['./form-editar.component.css']
})
export class FormEditarComponent {
  listaCategorias: any = ["Tecnológico", "Vehículo", "Moda", "Hogar y mueble"]
  editarInvalido: boolean = false;
  productoId: any;
  producto: any = {};
  listadoProveedores: any = [];
  listadoNombresJoinApellidoRzonSocial: any = []
  listadoNombresJoinApellido: any = []
  proveedorEncontrado: any = []
  categoriaEncontrada:any=[];

  productosSKU: any = []
  isDisabled = true;
  codigoSku: string = '';
  nombreProducto: string = '';
  proveedor: string = '';
  categoria: string = '';
  imagen: string = '';
  descripcion: string = '';
  precio: string = '';

  codigoSkuvalidado: boolean = false;
  codigoSkuRepetidovalidado: boolean = false;
  nombreProductoValido: boolean = false;
  nombreProveedorValido: boolean = false;
  nombreCategoriaValido: boolean = false;
  nombreImagenValido: boolean = false;
  nombreLengthImagenValido: boolean = false;
  nombreDescripcionValido: boolean = false;
  nombrePrecioValido: boolean = false;
  private modalService = inject(NgbModal);


  constructor(private serviceProduct: ProductosService,
    private route: Router, private _activateRoute: ActivatedRoute,
    private serviceProveedor: ProveedoresService,
    private categoriaServices: CategoriasService) {
    /* ;*/
  }

  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe(data => {
      this.productoId = data.get('id');
    })
    this.serviceProduct.getById(this.productoId).subscribe(res => {
      this.producto = res;
      console.log(this.producto)
      this.codigoSku = this.producto.codigoSKU;
      this.nombreProducto = this.producto.nombreProducto;
      this.proveedor = this.producto.proveedorId.nombreProveedor;
      this.categoria = this.producto.categoria.nombre;
      this.imagen = this.producto.imagen;
      this.descripcion = this.producto.descripcion;
      this.precio = this.producto.precio;
    })

    this.getListadProveedores()
    this.getListaCategorias();
  }

  getListadProveedores() {
    this.serviceProveedor.get().subscribe((data: any) => {
      this.listadoProveedores = data

      for (let i = 0; i < this.listadoProveedores.length; i++) {
        let join = this.listadoProveedores[i].apellido + " " + this.listadoProveedores[i].nombre;
        this.listadoNombresJoinApellidoRzonSocial.push({ union: join, razonSocial: this.listadoProveedores[i].razonSocial, id: this.listadoProveedores[i].id })
      }

      const eliminaProveedoresRepetidos = new Set(this.listadoNombresJoinApellidoRzonSocial)
      this.listadoNombresJoinApellidoRzonSocial = [...eliminaProveedoresRepetidos];
      this.listadoNombresJoinApellido = this.listadoNombresJoinApellidoRzonSocial.map((item: any) =>
        item.union
      )

      const eliminaProveedoresRepetidosName = new Set(this.listadoNombresJoinApellido)
      this.listadoNombresJoinApellido = [...eliminaProveedoresRepetidosName];
    });
  }
  getListaCategorias() {
    this.categoriaServices.get().subscribe((data: any) => {
      this.listaCategorias = data;
    })
  }

  openScrollableContent(longContent: TemplateRef<any>) {
    console.log("Estoy haciendo notificacion")
    this.modalService.open(longContent, { scrollable: true });
  }


  cambiaEstadoValidado(valor: any) {
    if (valor.length > 2) {
      this.codigoSkuvalidado = false;
    }
    if (valor.length <= 2) {
      this.codigoSkuvalidado = true;
    }
    let skuValidate = this.productosSKU.filter((item: any) => item == valor)
    if (skuValidate[0]) {
      this.codigoSkuRepetidovalidado = true;
    }
    if (!skuValidate[0]) {
      this.codigoSkuRepetidovalidado = false;
    }
  }

  cambiaNombreProductoValidado(valor: any) {
    if (valor.length <= 2) {
      this.nombreProductoValido = true;
    }
    if (valor.length > 2) {
      this.nombreProductoValido = false;
    }
  }

  cambiaProveedorValidado(valor: any) {
    if (valor.length <= 2) {
      this.nombreProveedorValido = true;
    }
    if (valor.length > 2) {
      this.nombreProveedorValido = false;
    }
  }

  cambiaCategoriaValidado(valor: any) {
    if (valor.length <= 2) {
      this.nombreCategoriaValido = true;
    }
    if (valor.length > 2) {
      this.nombreCategoriaValido = false;
    }
  }
  cambiaImagenValidado(valor: any) {
    if (valor.replace(/(http|https|ftp|ftps).*(png|jpg|jpeg|gif|webp|=)$/g, "")) {
      this.nombreImagenValido = true;
    }
    if (!valor.replace(/(http|https|ftp|ftps).*(png|jpg|jpeg|gif|webp|=)$/g, "")) {
      this.nombreImagenValido = false;
    }
    if (valor.length <= 5) {
      this.nombreLengthImagenValido = true;
    }
    if (valor.length > 5) {
      this.nombreLengthImagenValido = false;
    }
  }

  cambiaNombreDescripcionValidado(valor: any) {
    if (valor.length <= 10) {
      this.nombreDescripcionValido = true;
    }
    if (valor.length > 10) {
      this.nombreDescripcionValido = false;
    }
  }

  cambiaNombrePrecioValidado(valor: any) {
    let price = parseInt(valor)
    if (price <= 0) {
      this.nombrePrecioValido = true;
    }
    if (price > 0) {
      this.nombrePrecioValido = false;
    }
  }



  private validarFormulario(): boolean {
    let skuValidate = this.productosSKU.filter((item: any) => item == this.codigoSku)
    let price = parseInt(this.precio)
    //let proveedorContieneNumeros = this.proveedor.replace(/[^0-9]/g,"").length;
    if (skuValidate[0]) {
      this.codigoSkuRepetidovalidado = true;
      return false;
    }
    if (!this.codigoSku) {
      this.codigoSkuvalidado = true;
      return false;
    }
    if (!this.nombreProducto || this.nombreProducto.length < 2) {
      this.nombreProductoValido = true;
      return false;
    }
    if (!this.proveedor) {
      this.nombreProveedorValido = true;
      return false;
    }
    if (!this.categoria) {
      this.nombreCategoriaValido = true;
      return false;
    }
    if (!this.imagen) {
      this.nombreImagenValido = true;
      return false;
    }
    if (this.imagen.replace(/(http|https|ftp|ftps).*(png|jpg|jpeg|gif|webp|=)$/g, "")) {
      this.nombreImagenValido = true;
      return false;
    }
    if (!this.descripcion || this.descripcion.length < 10) {
      this.nombreDescripcionValido = true;
      return false;
    }
    if (!this.precio || price <= 0) {
      this.nombrePrecioValido = true;
      return false;
    }
    return true;
  }



  //Funciones de botones Enviar y Limpiar
  enviar(form: any, longContent: TemplateRef<any>): void {

    if (this.validarFormulario()) {
      this.proveedorEncontrado = this.listadoProveedores.filter((item: any) => item.nombreProveedor == this.proveedor)
      this.categoriaEncontrada = this.listaCategorias.filter((item: any) => item.nombre == this.categoria)
      const formData = {
        codigoSKU: this.codigoSku,
        nombreProducto: this.nombreProducto,
        imagen: this.imagen,
        descripcion: this.descripcion,
        precio: this.precio,
        proveedor: this.proveedor,
        habilitado: this.producto.habilitado,
        proveedorId: {
          id: this.proveedorEncontrado[0].id,
        },
        categoria: {
          id: this.categoriaEncontrada[0].id
        }
      };
      const productoCompare = {
        codigoSKU: this.producto.codigoSku,
        nombreProducto: this.producto.nombreProducto,
        imagen: this.producto.imagen,
        descripcion: this.producto.descripcion,
        precio: this.producto.precio,
        proveedor: this.producto.proveedor,
        habilitado: this.producto.habilitado,
        proveedorId: this.producto.proveedorId,
        categoria: this.producto.categoria
      }
      if (JSON.stringify(formData) == JSON.stringify(productoCompare)) {
        this.editarInvalido = true;
      } else {
        this.editarInvalido = false;
        this.openScrollableContent(longContent)
        this.serviceProduct.put(formData, this.productoId).subscribe(res => {
          console.log(res)
        },(error)=>{
          this.route.navigate(['/', 'productos'])
        });
      }
    }
  }

  limpiar() {
    this.nombreProducto = "";
    this.proveedor = "";
    this.categoria = "";
    this.imagen = "";
    this.descripcion = "";
    this.precio = "";
  }
}
