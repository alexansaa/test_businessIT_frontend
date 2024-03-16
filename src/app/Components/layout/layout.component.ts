import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

import { ShareModule } from '../../Reutilizable/share/share.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    ShareModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
