import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShareModule } from '../../../../Reutilizable/share/share.module';

import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { ServicioService } from '../../../../Services/servicio.service';
import { Servicio } from '../../../../Interfaces/servicio';

@Component({
  selector: 'app-modal-servicio',
  standalone: true,
  imports: [
    MatDialogModule,
    ShareModule,
  ],
  templateUrl: './modal-servicio.component.html',
  styleUrl: './modal-servicio.component.css'
})

export class ModalServicioComponent implements OnInit {
  formularioServicio: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";

  constructor(
    private modalActual: MatDialogRef<ModalServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosServicio: Servicio,
    private fb: FormBuilder,
    private servicioService: ServicioService,
    private _utilidadService: UtilidadService
  ) {
    this.formularioServicio = this.fb.group({
      // id: ['',Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    })

    if (this.datosServicio != null) {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
  }

  ngOnInit(): void {
    if (this.datosServicio != null) {
      this.formularioServicio.patchValue({
        name: this.datosServicio.name,
        description: this.datosServicio.description,
      })
    }
  }

  guardarEditar_Servicio(){
    console.log(this.formularioServicio.value);
    
    const _servicio: Servicio = {
      id: this.datosServicio == null ? 0 : this.datosServicio.id,
      name: this.formularioServicio.value.nombreCompleto,
      description: this.formularioServicio.value.descripcion,
    }

    if(this.datosServicio == null){
      this.servicioService.crear(_servicio).subscribe({
        next: (data) => {
          if(data.status){
            this._utilidadService.mostrarAlerta("El servicio fue registrado!", "Exito");
            this.modalActual.close("true");
          }else{
            this._utilidadService.mostrarAlerta("No se pudo registrar el servicio", "Error");
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    }else{
      this.servicioService.editar(_servicio).subscribe({
        next: (data) => {
          if(data.status){
            this._utilidadService.mostrarAlerta("El servicio fue editado!", "Exito");
            this.modalActual.close("true");
          }else{
            this._utilidadService.mostrarAlerta("No se pudo editar el servicio", "Error");
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    }
  }

}
