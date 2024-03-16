import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../../../Services/dashboard.service';
import {Chart, registerables} from 'chart.js';
import { ShareModule } from '../../../../Reutilizable/share/share.module';
Chart.register(...registerables);



@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [
    ShareModule
  ],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent implements OnInit {
  totalServicios: number = 0;
  totalClientes: number = 0;

  constructor(
    private _dashboardService: DashboardService,
  ){}

  ngOnInit(): void {
    this._dashboardService.resumen().subscribe({
      next: (data) => {
        if(data.status){          
          this.totalClientes = data.value.clientes.length;
          this.totalServicios = data.value.servicios.length;

          const labels = ['clientes','servicios'];
          const datas = [this.totalClientes,this.totalServicios];

          this.mostrarGraficos(labels, datas);
        }
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  mostrarGraficos(labelGraficos: any[], dataGraficos: any[]){
    const chartBarras = new Chart('chartBarras',{
      type: 'bar',
      data: {
        labels: labelGraficos,
        datasets: [{
          label: "# de Elementos",
          data: dataGraficos,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor:[
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options:{
        maintainAspectRatio: false,
        responsive: true,
        scales:{
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
  
}
