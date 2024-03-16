import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShareModule } from './Reutilizable/share/share.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ShareModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AppSystemTest';
}
