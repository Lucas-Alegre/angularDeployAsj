import { Component, OnInit } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  logeadoCorrecto = false
  logeadoInCorrecto = true
  valorUpdata = localStorage.getItem('signUpHabilitado');
  update: any;
  title = 'entrega-app-angular';
  isSideNavCollapsed = false;
  screenWidth = 0;

  recibirMensaje(bool: boolean) {
    if (bool) {
      this.logeadoCorrecto = true
      this.logeadoInCorrecto = false
    }
  }
  salir(bool: boolean) {
    if (bool) {
      this.logeadoCorrecto = false
      this.logeadoInCorrecto = true
    }
  }


  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
