import { Component, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RubroService } from 'src/app/services/rubro/rubro.service';

@Component({
  selector: 'app-agregar-rubro',
  templateUrl: './agregar-rubro.component.html',
  styleUrl: './agregar-rubro.component.css'
})
export class AgregarRubroComponent {

  nombre: String = "";
  private modalService = inject(NgbModal);
  nombreInvalido: boolean = false;
  editarInvalido: boolean = false;

  constructor(private rubroServices: RubroService, private route: Router) { }

  openScrollableContent(longContent: TemplateRef<any>) {
    this.modalService.open(longContent, { scrollable: true });
  }

  nombreChange(evento: any) {
    if (evento.length < 4) {
      this.nombreInvalido = true
    } else {
      this.nombreInvalido = false
      this.editarInvalido = false;
    }
  }

  enviar(form: any, longContent: TemplateRef<any>): void {
    const newRubro = {
      nombre: this.nombre,
      habilitado: 1,
    }
    if (this.nombre.length >= 4) {
      this.openScrollableContent(longContent)
      this.rubroServices.post(newRubro).subscribe((data: any) => {
        console.log(data)
      }, (error) => {
        this.route.navigate(['/', 'rubros'])
      });
    } else {
      this.nombreInvalido = true
      this.editarInvalido = true;
    }


  }

  limpiar() {
    this.nombre = "";
  }
}
