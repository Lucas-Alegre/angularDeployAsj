import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from 'src/app/services/categoria/categorias.service';
import { ProductosService } from 'src/app/services/producto/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';

@Component({
  selector: 'app-form-agregar-producto',
  templateUrl: './form-agregar-producto.component.html',
  styleUrls: ['./form-agregar-producto.component.css']
})
export class FormAgregarProductoComponent implements OnInit {
  listaCategorias: any = []
  private modalService = inject(NgbModal);

  idNuevo = 0;
  productosSKU: any = []
  listadoProveedores: any = []
  proveedorEncontrado: any = [];
  categoriaEncontrada: any = [];

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

  constructor(
    private serviceProduct: ProductosService,
    private route: Router,
    private serviceProveedor: ProveedoresService,
    private categoriaServices: CategoriasService) { }

  ngOnInit(): void {
    this.serviceProduct.get().subscribe(data => {
      this.idNuevo = data.length;
      this.productosSKU = data.map((item: any) => item.codigoSKU);
    });
    this.getListadProveedores()
    this.getListaCategorias();
  }

  //Se obtiene proveedores ty categorias
  getListadProveedores() {
    this.serviceProveedor.get().subscribe((data: any) => {
      this.listadoProveedores = data
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

  //Se valida los inputs
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


  //Se valida formulario
  private validarFormulario(): boolean {
    let skuValidate = this.productosSKU.filter((item: any) => item == this.codigoSku)
    let price = parseInt(this.precio)
    
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
        habilitado: 1,
        proveedorId: {
          id: this.proveedorEncontrado[0].id,
        },
        categoria: {
          id: this.categoriaEncontrada[0].id
        }
      };
      this.openScrollableContent(longContent)
      this.serviceProduct.post(formData).subscribe(res => {
        alert("Se agrego un producto correctamente")
        console.log(res)
        
        //this.route.navigate(['/', 'productos']) 
      },(error)=>{
        this.route.navigate(['/', 'productos'])
      });
    }
  }

  limpiar() {
    this.codigoSku = "";
    this.nombreProducto = "";
    this.proveedor = "";
    this.categoria = "";
    this.imagen = "";
    this.descripcion = "";
    this.precio = "";
  }
}
