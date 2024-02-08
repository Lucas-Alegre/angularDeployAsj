import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './pages/body/body.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductosComponent } from './componentes/productos/listado/productos.component';
import { ProveedoresComponent } from './componentes/proveedores/listado/proveedores.component';
import { OrdenCompraComponent } from './componentes/orden-compra/listado/orden-compra.component';
import { FormAgregarProductoComponent } from './componentes/productos/form/form-agregar/form-agregar-producto.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosService } from './services/producto/productos.service';
import { HttpClientModule } from '@angular/common/http';
import { FormEditarComponent } from './componentes/productos/form/form-editar/form-editar.component';

import { FormAgregarProveedorComponent } from './componentes/proveedores/form/form-agregar-proveedor/form-agregar-proveedor.component';
import { FormEditarProveedorComponent } from './componentes/proveedores/form/form-editar-proveedor/form-editar-proveedor.component';
import { ProveedoresService } from './services/proveedores/proveedores.service';
import { OrdenCompraService } from './services/orden-de-compra/orden-compra.service';
import { FormAgregarOrdenCompraComponent } from './componentes/orden-compra/form/form-agregar-orden-compra/form-agregar-orden-compra.component';
import { FormEditarOrdenCompraComponent } from './componentes/orden-compra/form/form-editar-orden-compra/form-editar-orden-compra.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { CountryService } from './services/country/country.service';
import { CategoriasService } from './services/categoria/categorias.service';
import { CaegoriasComponent } from './componentes/categorias/listado/caegorias/caegorias.component';
import { AgregarCategoriaComponent } from './componentes/categorias/form/agregar-categoria/agregar-categoria.component';
import { EditarCategoriaComponent } from './componentes/categorias/form/editar-categoria/editar-categoria.component';
import { RubroComponent } from './componentes/rubro/listado/rubro/rubro.component';
import { RubroService } from './services/rubro/rubro.service';
import { AgregarRubroComponent } from './componentes/rubro/form/agregar-rubro/agregar-rubro.component';
import { EditarRubroComponent } from './componentes/rubro/form/editar-rubro/editar-rubro.component';
import { DashboardComponent } from './componentes/dashboard/dashboard/dashboard.component';
import { CondicionIvaService } from './services/condicionDeIva/condicion-iva.service';
import { PaisService } from './services/pais/pais.service';
import { ProvinciasService } from './services/provincias/provincias.service';
import { DireccionService } from './services/direccion/direccion.service';
import { ContactosService } from './services/contactos/contactos.service';
import { LoginComponent } from './pages/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    ProductosComponent,
    ProveedoresComponent,
    OrdenCompraComponent,
    CaegoriasComponent,
    FormAgregarProductoComponent,
    FormEditarComponent,
    FormAgregarProveedorComponent,
    FormEditarProveedorComponent,
    FormAgregarOrdenCompraComponent,
    FormEditarOrdenCompraComponent,
    AgregarCategoriaComponent,
    EditarCategoriaComponent,
    RubroComponent,
    AgregarRubroComponent,
    EditarRubroComponent,
    DashboardComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ProductosService, ProveedoresService, OrdenCompraService, CountryService,
    CategoriasService, RubroService, CondicionIvaService, PaisService, ProvinciasService,
    DireccionService, ContactosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
