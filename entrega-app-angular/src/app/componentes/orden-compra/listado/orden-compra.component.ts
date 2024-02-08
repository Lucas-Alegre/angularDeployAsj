import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdenCompraService } from 'src/app/services/orden-de-compra/orden-compra.service';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent implements OnInit {
  ordenDeCompra: any = [];
  ordenDeCompra2: any = [];
  ordenesFechasCreadas: any = []
  listaProveedores: any = []
  ordenDetail: any = {}
  ordenDetailTotal = 0;
  ordenDetailSuma = 0;
  seElimino: boolean = false
  existenOrdenes: boolean = false;
  estaEnAltas: boolean = false;
  estaEnBajas: boolean = true;
  textoDeInput = "";
  private modalService = inject(NgbModal);

  constructor(private ordenService: OrdenCompraService,
    private proveedoresService: ProveedoresService,
    private route: Router) { }

  ngOnInit(): void {
    this.getOrdenCompra()
    this.getListaProveedores()
  }

  onKeyUp(event: any) {
    console.log("valor model: " + this.textoDeInput);
    //hacer filtro
    this.ordenDeCompra2 = this.ordenDeCompra.filter((e: any) =>
      e.ordenDireccion.toUpperCase().includes(this.textoDeInput.toUpperCase())
    );
  }

  openScrollableContent(longContent: TemplateRef<any>, id: any) {
    this.ordenService.getById(id).subscribe((data: any) => {
      this.ordenDetail = data;
      for (let i = 0; i < this.ordenDetail.detalles.length; i++) {
        this.ordenDetailSuma += this.ordenDetail.detalles[i].detalleCantidad * this.ordenDetail.detalles[i].productosId.precio;
      }
    });

    this.modalService.open(longContent, { scrollable: true });
  }

  openScrollableContentBaja(longContent: TemplateRef<any>) {
    this.modalService.open(longContent, { scrollable: true });
  }

  filtrarProveedores(evento: any) {
    if (evento.target.value == "todos") {
      this.ordenDeCompra2 = this.ordenDeCompra;
    } else {
      this.ordenDeCompra2 = this.ordenDeCompra.filter((e: any) => e.proveedorId.nombreProveedor == evento.target.value);
    }

  }

  getOrdenesDeAlta() {
    this.estaEnBajas = true;
    this.estaEnAltas = false;
    this.existenOrdenes = false;
    this.getOrdenCompra()
  }

  getOrdenCompra() {

    this.ordenService.get().subscribe((data: any) => {
      this.ordenDeCompra = data;
      this.ordenDeCompra = this.ordenDeCompra.filter((ord: any) => ord.estadoId.nombre == "aceptada")
      if (this.ordenDeCompra.length < 1) {
        this.existenOrdenes = true;
      }
      this.ordenDeCompra2 = this.ordenDeCompra;
    });
  }

  getOrdenesDeBaja() {
    this.estaEnAltas = true;
    this.estaEnBajas = false;
    this.existenOrdenes = false;
    this.ordenService.get().subscribe((data: any) => {
      this.ordenDeCompra = data;
      this.ordenDeCompra = this.ordenDeCompra.filter((ord: any) => ord.estadoId.nombre == "rechazada")
      if (this.ordenDeCompra.length < 1) {
        this.existenOrdenes = true;
      }
      this.ordenDeCompra2 = this.ordenDeCompra;
    });
  }

  getListaProveedores() {
    this.proveedoresService.get().subscribe((data) => {
      this.listaProveedores = data;
      console.log(this.listaProveedores)
    })
  }

  
  eliminar(orden: any, longContent: TemplateRef<any>) {
    //borrado logico editando el habilitado=false
    const ordenEditado = {
      ordenDireccion: orden.ordenDireccion,
      ordenInformacionRecepcion: orden.ordenInformacionRecepcion,
      total: orden.total,
      habilitado: true,
      fechaDeEntrega: orden.fechaDeEntrega,
      proveedorId: orden.proveedorId,
      estadoId: { id: 3 }
    }
     this.openScrollableContentBaja(longContent)
    this.ordenService.put(ordenEditado, orden.id).subscribe(res => {
      alert("Se Dio de Baja a una orden correctamente")
    }, (error) => {
      this.getOrdenCompra()
    })
  }

  darDeAlta(orden: any, longContent: TemplateRef<any>) {
    const ordenEditado = {
      ordenDireccion: orden.ordenDireccion,
      ordenInformacionRecepcion: orden.ordenInformacionRecepcion,
      total: orden.total,
      habilitado: true,
      fechaDeEntrega: orden.fechaDeEntrega,
      proveedorId: orden.proveedorId,
      estadoId: { id: 2 }
    }
    console.log("Soy editado")
    console.log(ordenEditado);
    this.openScrollableContentBaja(longContent)
    this.ordenService.put(ordenEditado, orden.id).subscribe(res => {
      alert("Se Dio de Alta a una orden correctamente")
    }, (error) => {
      this.getOrdenesDeBaja()
    })
  }
}
