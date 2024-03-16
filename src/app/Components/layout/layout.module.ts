import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { ClientesComponent } from './Pages/clientes/clientes.component';
import { ServiciosComponent } from './Pages/servicios/servicios.component';
import { ShareModule } from '../../Reutilizable/share/share.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    DashBoardComponent,
    ClientesComponent,
    ServiciosComponent,
    ShareModule
  ]
})
export class LayoutModule { }
