import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { ClientesComponent } from './Pages/clientes/clientes.component';
import { ServiciosComponent } from './Pages/servicios/servicios.component';

const routes: Routes = [{
  path:'',component:LayoutComponent,children:[
    {path:'dashboard',component:DashBoardComponent},
    {path:'clientes',component:ClientesComponent},
    {path:'servicios',component:ServiciosComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
