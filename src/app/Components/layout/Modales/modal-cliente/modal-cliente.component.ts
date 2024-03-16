import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShareModule } from '../../../../Reutilizable/share/share.module';
import { Cliente } from '../../../../Interfaces/cliente';

import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { ClienteService } from '../../../../Services/cliente.service';

@Component({
  selector: 'app-modal-cliente',
  standalone: true,
  imports: [
    MatDialogModule,
    ShareModule,
  ],
  templateUrl: './modal-cliente.component.html',
  styleUrl: './modal-cliente.component.css'
})

export class ModalClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";

  constructor(
    private modalActual: MatDialogRef<ModalClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public datosCliente: Cliente,
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private _utilidadService: UtilidadService
  ) {
    this.formularioCliente = this.fb.group({
      // id: ['',Validators.required],
      nombreCompleto: ['', Validators.required],
      email: ['', Validators.required]
    })

    if (this.datosCliente != null) {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
  }

  ngOnInit(): void {
    if (this.datosCliente != null) {
      this.formularioCliente.patchValue({
        nombreCompleto: this.datosCliente.name,
        email: this.datosCliente.email,
      })
    }
  }

  guardarEditar_Cliente(){
    console.log(this.formularioCliente.value);
    
    const _cliente: Cliente = {
      id: this.datosCliente == null ? 0 : this.datosCliente.id,
      name: this.formularioCliente.value.nombreCompleto,
      email: this.formularioCliente.value.email,
    }

    if(this.datosCliente == null){
      this.clienteService.crear(_cliente).subscribe({
        next: (data) => {
          if(data.status){
            this._utilidadService.mostrarAlerta("El cliente fue registrado!", "Exito");
            this.modalActual.close("true");
          }else{
            this._utilidadService.mostrarAlerta("No se pudo registrar el usuario", "Error");
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    }else{
      this.clienteService.editar(_cliente).subscribe({
        next: (data) => {
          if(data.status){
            this._utilidadService.mostrarAlerta("El cliente fue editado!", "Exito");
            this.modalActual.close("true");
          }else{
            this._utilidadService.mostrarAlerta("No se pudo editar el usuario", "Error");
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    }
  }

}
