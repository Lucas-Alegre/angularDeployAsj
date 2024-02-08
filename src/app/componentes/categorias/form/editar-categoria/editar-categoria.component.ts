import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from 'src/app/services/categoria/categorias.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css'
})
export class EditarCategoriaComponent implements OnInit {
  nombre: String = "";
  private modalService = inject(NgbModal);
  categoriaId: any;
  categoria: any = {}

  constructor(private categoriaServices: CategoriasService, private route: Router, private _activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe(data => {
      this.categoriaId = data.get('id');
    })
    this.categoriaServices.getById(this.categoriaId).subscribe(res => {
      this.categoria = res;
      this.nombre = this.categoria.nombre;

    })
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
    this.categoriaServices.put(newCategoria,this.categoriaId).subscribe((data: any) => {
      console.log(data)
    }, (error) => {
      this.route.navigate(['/', 'categorias'])
    });
  }

  limpiar() {
    this.nombre = "";
  }
}
