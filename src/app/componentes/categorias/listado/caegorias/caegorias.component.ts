import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasService } from 'src/app/services/categoria/categorias.service';

@Component({
  selector: 'app-caegorias',
  standalone: false,
  templateUrl: './caegorias.component.html',
  styleUrl: './caegorias.component.css'
})
export class CaegoriasComponent implements OnInit {
  listaCategorias: any[] = []
  categoriaAux:any[]=[]
  noExistenCategorias:boolean=false;
  private modalService = inject(NgbModal);
  constructor(private categoriaServices: CategoriasService) { }

  ngOnInit(): void {
    this.getListaCategorias();
  }

  getListaCategorias() {
    this.categoriaServices.get().subscribe((data: any) => {
      console.log(data)
      this.listaCategorias = data;
      this.listaCategorias= this.listaCategorias.filter((e: any) => e.habilitado == true)
      if(this.listaCategorias.length<1){
        this.noExistenCategorias = true;
      }
      this.categoriaAux = this.listaCategorias;
    })
  }

  openScrollableContentBaja(longContent: TemplateRef<any>) {
    this.modalService.open(longContent, { scrollable: true });
  }

  eliminar(categoria: any, longContent: TemplateRef<any>) {
    this.openScrollableContentBaja(longContent)
    //borar
    const newCategoria ={
      nombre: categoria.nombre,
      habilitado: 0,
    }
    this.categoriaServices.put(newCategoria,categoria.id).subscribe((data: any) => {
      console.log(data);
      this.getListaCategorias();
    }, (error) => {
      this.getListaCategorias();
    })
  }

}
