import { InjectionToken } from "@angular/core";
import { ClienteService } from "../cliente.service";

export const CLIENTE_SERVICE_TOKEN = new InjectionToken<ClienteService>('CLIENTE_SERVICE_TOKEN');