import { style } from '@angular/animations';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from 'src/app/services/categoria/categorias.service';
import { ProductosService } from 'src/app/services/producto/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productDetail: any = {};
  listaCategorias: any = [];
  productos: any = []
  productosAux: any = []
  eventValue = "";
  textoDeInput = "";
  noExistenProductos: boolean = false;
  estaEnAltas: boolean = false;
  estaEnBajas: boolean = true;
  private modalService = inject(NgbModal);
  constructor(private servicesProducto: ProductosService, private categoriaServices: CategoriasService) { }

  ngOnInit(): void {
    this.getProductos()
    this.getListaCategorias();
  }

  openScrollableContent(longContent: TemplateRef<any>, id: any) {
    this.servicesProducto.getById(id).subscribe((data) => {
      this.productDetail = data;
      console.log(this.productDetail)
    });

    this.modalService.open(longContent, { scrollable: true });
  }
  openScrollableContentBaja(longContent: TemplateRef<any>) {
    console.log("Estoy haciendo notificacion")
    this.modalService.open(longContent, { scrollable: true });
  }

  onKeyUp(event: any) {
    console.log("valor model: " + this.textoDeInput);
    //hacer filtro
    this.productosAux = this.productos.filter((e: any) =>
      e.nombreProducto.toUpperCase().includes(this.textoDeInput.toUpperCase()) ||
      e.descripcion.toUpperCase().includes(this.textoDeInput.toUpperCase()));
      this.productosAux.sort(this.sortFunc)
  }

  productosAlta() {
    this.estaEnBajas = true;
    this.estaEnAltas = false;
    this.noExistenProductos = false;
    this.getProductos();
  }

  productosbaja() {
    this.estaEnAltas = true;
    this.estaEnBajas = false;
    this.noExistenProductos = false;
    this.servicesProducto.get().subscribe((data) => {

      this.productos = data
      this.productos = this.productos.filter((e: any) => e.habilitado == false)
      if (this.productos.length < 1) {
        this.noExistenProductos = true;
      }
      this.productos.sort(this.sortFunc)
      this.productosAux = this.productos;
      this.productosAux.sort(this.sortFunc)
    });
  }

  filtrarCategoria(evento: any) {
    console.log(evento)
    if (evento.target.value == "todos") {
      console.log("Soy todos jajajaja");
      this.productosAux = this.productos;
      this.productosAux.sort(this.sortFunc)
    } else {
      this.productosAux = this.productos.filter((e: any) => e.categoria.nombre == evento.target.value);
      this.productosAux.sort(this.sortFunc)
    }

  }
  getProductos() {
    this.servicesProducto.get().subscribe((data) => {

      this.productos = data
      this.productos = this.productos.filter((e: any) => e.habilitado == true)
      if (this.productos.length < 1) {
        this.noExistenProductos = true;
      }
      this.productos.sort(this.sortFunc)
      this.productosAux = this.productos;
      this.productosAux.sort(this.sortFunc)
    });
  }
  getListaCategorias() {
    this.categoriaServices.get().subscribe((data: any) => {
      this.listaCategorias = data;
    })
  }

  sortFunc(a: any, b: any) {
    if (a.nombreProducto < b.nombreProducto) {
      return -1;
    }
    if (a.nombreProducto > b.nombreProducto) {
      return 1;
    }
    return 0;
  }

  eliminar(product: any, longContent: TemplateRef<any>) {
    //borrado logico editando el habilitado=false
    const productEditado = {
      fechaCreacion: product.fechaCreacion,
      fechaActualizacion: product.fechaActualizacion,
      id: product.id,
      codigoSKU: product.codigoSKU,
      nombreProducto: product.nombreProducto,
      imagen: product.imagen,
      descripcion: product.descripcion,
      precio: product.precio,
      habilitado: 0,
      proveedorId: {
        id: product.proveedorId.id,
      },
      categoria: {
        id: product.categoria.id
      }
    }
    this.openScrollableContentBaja(longContent)
    this.servicesProducto.put(productEditado, product.id).subscribe(res => {
      alert("Se eliminó logicamente un producto correctamente")
    }, (error) => {
      this.getProductos()
    })
  }

  darDeAlta(product: any, longContent: TemplateRef<any>) {
    const productEditado = {
      fechaCreacion: product.fechaCreacion,
      fechaActualizacion: product.fechaActualizacion,
      id: product.id,
      codigoSKU: product.codigoSKU,
      nombreProducto: product.nombreProducto,
      imagen: product.imagen,
      descripcion: product.descripcion,
      precio: product.precio,
      habilitado: 1,
      proveedorId: {
        id: product.proveedorId.id,
      },
      categoria: {
        id: product.categoria.id
      }
    }
    this.openScrollableContentBaja(longContent)
    this.servicesProducto.put(productEditado, product.id).subscribe(res => {
      alert("Se Dio de Alta a un producto correctamente")
    }, (error) => {
      this.productosbaja()
    })
  }
}
