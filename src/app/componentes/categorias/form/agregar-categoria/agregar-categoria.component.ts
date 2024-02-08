import { Component, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from 'src/app/services/categoria/categorias.service';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrl: './agregar-categoria.component.css'
})
export class AgregarCategoriaComponent {
  nombre: String = "";
  private modalService = inject(NgbModal);

  constructor(private categoriaServices: CategoriasService, private route: Router,) {

  }
  openScrollableContent(longContent: TemplateRef<any>) {
    console.log("Estoy haciendo notificacion")
    this.modalService.open(longContent, { scrollable: true });
  }

  enviar(form: any, longContent: TemplateRef<any>): void {
    const newCategoria = {
      nombre: this.nombre,
      habilitado: 1,
    }
    this.openScrollableContent(longContent)
    this.categoriaServices.post(newCategoria).subscribe((data: any) => {
      console.log(data)
    }, (error) => {
      this.route.navigate(['/', 'categorias'])
    });
  }

  limpiar() {
    this.nombre = "";
  }
}
