import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './componentes/productos/listado/productos.component';
import { ProveedoresComponent } from './componentes/proveedores/listado/proveedores.component';
import { OrdenCompraComponent } from './componentes/orden-compra/listado/orden-compra.component';
import { FormAgregarProductoComponent } from './componentes/productos/form/form-agregar/form-agregar-producto.component';
import { FormEditarComponent } from './componentes/productos/form/form-editar/form-editar.component';
import { FormAgregarProveedorComponent } from './componentes/proveedores/form/form-agregar-proveedor/form-agregar-proveedor.component';
import { FormEditarProveedorComponent } from './componentes/proveedores/form/form-editar-proveedor/form-editar-proveedor.component';
import { FormAgregarOrdenCompraComponent } from './componentes/orden-compra/form/form-agregar-orden-compra/form-agregar-orden-compra.component';
import { FormEditarOrdenCompraComponent } from './componentes/orden-compra/form/form-editar-orden-compra/form-editar-orden-compra.component';
import { CaegoriasComponent } from './componentes/categorias/listado/caegorias/caegorias.component';
import { AgregarCategoriaComponent } from './componentes/categorias/form/agregar-categoria/agregar-categoria.component';
import { EditarCategoriaComponent } from './componentes/categorias/form/editar-categoria/editar-categoria.component';
import { RubroComponent } from './componentes/rubro/listado/rubro/rubro.component';
import { AgregarRubroComponent } from './componentes/rubro/form/agregar-rubro/agregar-rubro.component';
import { EditarRubroComponent } from './componentes/rubro/form/editar-rubro/editar-rubro.component';
import { DashboardComponent } from './componentes/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'orden-compra', component: OrdenCompraComponent },
  { path: 'agregar-producto', component: FormAgregarProductoComponent },
  { path: 'editar-producto/:id', component: FormEditarComponent },
  { path: 'agregar-proveedor', component: FormAgregarProveedorComponent },
  { path: 'editar-proveedor/:id', component: FormEditarProveedorComponent },
  { path: 'agregar-orden-compra', component: FormAgregarOrdenCompraComponent },
  { path: 'editar-orden-compra/:id', component: FormEditarOrdenCompraComponent },
  { path: 'editar-orden-compra/:valor', component: FormEditarOrdenCompraComponent },
  { path: 'editar-orden-compra/:valorprecio', component: FormEditarOrdenCompraComponent },
  { path: 'categorias', component: CaegoriasComponent },
  { path: 'agregar-categoria', component: AgregarCategoriaComponent },
  { path: 'editar-categoria/:id', component: EditarCategoriaComponent },
  { path: 'rubros', component: RubroComponent },
  { path: 'agregar-rubro', component: AgregarRubroComponent },
  { path: 'editar-rubro/:id', component: EditarRubroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
