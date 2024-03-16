import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalClienteComponent } from '../../Modales/modal-cliente/modal-cliente.component';
import { Cliente } from '../../../../Interfaces/cliente';
import { ClienteService } from '../../../../Services/cliente.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import Swal from 'sweetalert2';

import { ShareModule } from '../../../../Reutilizable/share/share.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    ShareModule,
    HttpClientModule,
  ],
  providers: [
    ClienteService,
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit, AfterViewInit {
  columnasTabla: string[] = ['id', 'nombre', 'email'];
  dataInicio: Cliente[] = [];
  dataListaClientes = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _clienteServicio: ClienteService,
    private _utilidadServicio: UtilidadService
  ) { }

  ngAfterViewInit(): void {
    this.dataListaClientes.paginator = this.paginacionTabla;
  }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this._clienteServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaClientes = data.value;
        } else {
          this._utilidadServicio.mostrarAlerta("No se encontraron datos de clientes!", "Oops!");
        }
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  aplicarFiltroTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaClientes.filter = filterValue.trim().toLowerCase();
  }

  nuevoCliente(){
    this.dialog.open(ModalClienteComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true"){
        this.obtenerClientes();
      }
    })
  }

  editarCliente(cliente:Cliente){
    this.dialog.open(ModalClienteComponent, {
      disableClose: true,
      data: cliente
    }).afterClosed().subscribe(resultado => {
      if(resultado === "true"){
        this.obtenerClientes();
      }
    })
  }

  eliminatCliente(cliente:Cliente){
    Swal.fire({
      title:"Desea eliminar el cliente?",
      text: cliente.name,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if(result.isConfirmed){
        this._clienteServicio.eliminar(cliente.id).subscribe({
          next: (data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("El cliente fue eliminado","listo!");
              this.obtenerClientes();
            }else{
              this._utilidadServicio.mostrarAlerta("No se pudo eliminar cliente","Error");
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
