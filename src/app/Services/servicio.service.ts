import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../src/enviroments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { Servicio } from '../Interfaces/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private urlApi:string = environment.endpoint + "Service/";

  constructor(private http:HttpClient) { }

  lista():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`);
  }

  crear(request: Servicio):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}Crear`, request);
  }

  editar(request: Servicio):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}Editar`, request);
  }

  eliminar(id: number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`);
  }
}
