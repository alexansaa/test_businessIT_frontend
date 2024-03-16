import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ShareModule } from '../../../../Reutilizable/share/share.module';
import { Servicio } from '../../../../Interfaces/servicio';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ServicioService } from '../../../../Services/servicio.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
import { ModalServicioComponent } from '../../Modales/modal-servicio/modal-servicio.component';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [
    ShareModule
  ],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent implements OnInit, AfterViewInit {
  columnasTabla: string[] = ['id', 'nombre', 'descripcion','editar','eliminar'];
  dataInicio: Servicio[] = [];
  dataListaServicios = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _serviciosService: ServicioService,
    private _utilidadService: UtilidadService
  ) { }

  ngAfterViewInit(): void {
      this.dataListaServicios.paginator = this.paginacionTabla;
  }

  ngOnInit(): void {
      this.obtenerServicios();
  }

  obtenerServicios(){
    this._serviciosService.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaServicios = data.value;
        } else {
          this._utilidadService.mostrarAlerta("No se encontraron datos de servicios!", "Oops!");
        }
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  aplicarFiltroTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaServicios.filter = filterValue.trim().toLowerCase();
  }

  nuevoServicio(){
    this.dialog.open(ModalServicioComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true"){
        this.obtenerServicios();
      }
    })
  }

  editarServicio(servicio:Servicio){
    this.dialog.open(ModalServicioComponent, {
      disableClose: true,
      data: servicio
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true"){
        this.obtenerServicios();
      }
    })
  }

  eliminarServicio(servicio: Servicio){
    Swal.fire({
      title: "Desea eliminar el servicio?",
      text: servicio.name,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if(result.isConfirmed){
        this._serviciosService.eliminar(servicio.id).subscribe({
          next: (data) => {
            if(data.status){
              this._utilidadService.mostrarAlerta("El servicio fue eliminado","listo!");
              this.obtenerServicios();
            }else{
              this._utilidadService.mostrarAlerta("No se pudo eliminar el servicio","Error");
            }
          },
          error: (e) => {
            console.error(e);
          }
        })
      }
    })
  }
}
