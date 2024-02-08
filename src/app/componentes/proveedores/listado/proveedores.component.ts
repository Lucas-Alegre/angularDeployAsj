import { Component, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryService } from 'src/app/services/country/country.service';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import { RubroService } from 'src/app/services/rubro/rubro.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  listaproveedor: any = []
  listaproveedorAux: any = []
  listaRubros: any = []
  proveedorDetail: any = {};
  estaEnBajas: boolean = true;
  estaEnAltas: boolean = false;
  existenProveedor: boolean = false;
  textoDeInput = "";
  private modalService = inject(NgbModal);

  constructor(
    private servicesProveedor: ProveedoresService,
    private route: Router,
    private rubroServices: RubroService) { }

  ngOnInit(): void {
    this.getProveedor()
    this.getListaRubros()
  }

  proveedoresAlta() {
    this.estaEnBajas = true;
    this.estaEnAltas = false;
    this.existenProveedor = false;
    this.getProveedor();
  }

  openScrollableContent(longContent: TemplateRef<any>, id: any) {
    this.servicesProveedor.getById(id).subscribe((data) => {
      this.proveedorDetail = data;
      console.log(this.proveedorDetail)
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
    this.listaproveedorAux = this.listaproveedor.filter((e: any) =>
      e.razonSocial.toUpperCase().includes(this.textoDeInput.toUpperCase()) ||
      e.codigo.toUpperCase().includes(this.textoDeInput.toUpperCase()));
    this.listaproveedorAux.sort(this.sortFunc)
  }
  getListaRubros() {
    this.rubroServices.get().subscribe((data: any) => {
      this.listaRubros = data;
    })
  }
  filtrarRubro(evento: any) {
    console.log(evento)
    if (evento.target.value == "todos") {
      console.log("Soy todos jajajaja");
      this.listaproveedorAux = this.listaproveedor;
      this.listaproveedorAux.sort(this.sortFunc)
    } else {
      this.listaproveedorAux = this.listaproveedor.filter((e: any) => e.rubro.nombre == evento.target.value);
      this.listaproveedorAux.sort(this.sortFunc)
    }
  }

  proveedoresbaja() {
    this.estaEnBajas = false;
    this.estaEnAltas = true;
    this.existenProveedor = false;
    this.servicesProveedor.get().subscribe((data) => {
      this.listaproveedor = data
      this.listaproveedor = this.listaproveedor.filter((e: any) => e.deleteAt == true)
      if (this.listaproveedor.length < 1) {
        this.existenProveedor = true;
      }
      this.listaproveedor.sort(this.sortFunc)
      this.listaproveedorAux = this.listaproveedor;
    });
  }


  getProveedor() {
    this.servicesProveedor.get().subscribe((data) => {
      this.listaproveedor = data
      this.listaproveedor = this.listaproveedor.filter((e: any) => e.deleteAt == false)
      if (this.listaproveedor.length < 1) {
        this.existenProveedor = true;
      }
      this.listaproveedor.sort(this.sortFunc)
      this.listaproveedorAux = this.listaproveedor;
    });
  }

  sortFunc(a: any, b: any) {
    if (a.nombreProveedor < b.nombreProveedor) {
      return -1;
    }
    if (a.nombreProveedor > b.nombreProveedor) {
      return 1;
    }
    return 0;
  }

  eliminar(proveedor: any, longContent: TemplateRef<any>) {
    //borrado logico editando el habilitado=false
    const proveedorEditado = {
      codigo: proveedor.codigo,
      razonSocial: proveedor.razonSocial,
      sitioWeb: proveedor.sitioWeb,
      imagen: proveedor.imagen,
      cuit: proveedor.cuit,
      nombreProveedor: proveedor.nombreProveedor,
      deleteAt: true,
      telefono: proveedor.telefono,
      direc: { "id": proveedor.direc.id },
      rubro: { "id": proveedor.rubro.id },
      condIva: { "id": proveedor.condIva.id },
      contactos: { "id": proveedor.contactos.id }
    }
    this.openScrollableContentBaja(longContent)
    this.servicesProveedor.put(proveedorEditado, proveedor.id).subscribe(res => {
      alert("Se eliminó logicamente un producto correctamente")
      this.getProveedor()
    }, (error) => {
      this.getProveedor()
    })
  }


  darDeAlta(proveedor: any, longContent: TemplateRef<any>) {
    const proveedorEditado = {
      codigo: proveedor.codigo,
      razonSocial: proveedor.razonSocial,
      sitioWeb: proveedor.sitioWeb,
      imagen: proveedor.imagen,
      cuit: proveedor.cuit,
      nombreProveedor: proveedor.nombreProveedor,
      deleteAt: false,
      telefono: proveedor.telefono,
      direc: { "id": proveedor.direc.id },
      rubro: { "id": proveedor.rubro.id },
      condIva: { "id": proveedor.condIva.id },
      contactos: { "id": proveedor.contactos.id }
    }
    this.openScrollableContentBaja(longContent)
    this.servicesProveedor.put(proveedorEditado, proveedor.id).subscribe(res => {
      alert("Se Dio de Alta a un producto correctamente")
    }, (error) => {
      this.proveedoresbaja()
    })
  }
}
