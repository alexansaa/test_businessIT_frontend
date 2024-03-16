import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShareModule } from './Reutilizable/share/share.module';

import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './Services/cliente.service';
import { ClientesComponent } from './Components/layout/Pages/clientes/clientes.component';
import { ModalClienteComponent } from './Components/layout/Modales/modal-cliente/modal-cliente.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // ShareModule,
    HttpClientModule
  ],
  providers:[
    ClienteService,
    // ModalClienteComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AppSystemTest';
}
