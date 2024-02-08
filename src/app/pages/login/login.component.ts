import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  logeadoInicial = true;
  @Output()
  enviar: EventEmitter<boolean> = new EventEmitter<boolean>()
  usuarionoEncontrado = false;
  isSideNavCollapsed = false;
  screenWidth = 0;
  logeadoCorrecto: boolean = false
  signupUsers: any[] = [];
  signupObj: any = {
    nameUser:'',
    email: '',
    password: ''
  }

  loginObj: any = {
    userName: '',
    password: ''
  }

  constructor(private route: Router) { }
  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData)
    }
  }

  onSignUp() {
    this.signupUsers.push(this.signupObj)
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    this.signupObj = {
      email: '',
      password: ''
    }
  }

  onLogin() {
    const isUserExist = this.signupUsers.find(m => m.email == this.loginObj.email && m.password == this.loginObj.password)
    if (isUserExist != undefined) {
      localStorage.setItem('userEncontrado', JSON.stringify(isUserExist));
      this.logeadoCorrecto = true
      this.logeadoInicial = false;
      this.enviar.emit(true)

      this.route.navigate(['/', 'dashboard'])
      //lanzar usuario no existe
    } else {
      this.usuarionoEncontrado = true;
      //llamar al local y colocar un stado en habilitado
      this.logeadoCorrecto = true
      this.logeadoInicial = false;
      localStorage.setItem('signUpHabilitado', "true");

    }

  }


  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
