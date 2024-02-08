import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RubroService } from 'src/app/services/rubro/rubro.service';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrl: './rubro.component.css'
})
export class RubroComponent {
  listaRubros: any[] = []
  rubrosAux: any[] = []
  noExistenRubros: boolean = false;
  private modalService = inject(NgbModal);
  constructor(private rubroServices: RubroService) { }

  ngOnInit(): void {
    this.getListaRubros();
  }

  getListaRubros() {
    this.rubroServices.get().subscribe((data: any) => {
      console.log(data)
      this.listaRubros = data;
      this.listaRubros = this.listaRubros.filter((e: any) => e.habilitado == true)
      if (this.listaRubros.length < 1) {
        this.noExistenRubros = true;
      }
      this.rubrosAux = this.listaRubros;
    })
  }
  //acaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  openScrollableContentBaja(longContent: TemplateRef<any>) {
    this.modalService.open(longContent, { scrollable: true });
  }

  eliminar(rubro: any, longContent: TemplateRef<any>) {
    this.openScrollableContentBaja(longContent)
    //borar
    const newRubro = {
      nombre: rubro.nombre,
      habilitado: 0,
    }
    this.rubroServices.put(newRubro, rubro.id).subscribe((data: any) => {
      this.getListaRubros();
    }, (error) => {
      this.getListaRubros();
    })
  }
}
