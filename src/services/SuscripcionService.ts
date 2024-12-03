import { Suscripcion } from "../models/Suscripcion";
import apiClient from "./interceptor";

export class SuscripcionService {
    getSuscripcionListByEmpresa(idEmpresa?: string) {
        return new Promise<Suscripcion[]>((resolve, reject) => {
            apiClient.get(`empresas/${idEmpresa}/suscripciones/`)
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    getSuscripcionById(idSuscripcion?: string) {
        return new Promise<Suscripcion>((resolve, reject) => {
            apiClient.get(`suscripciones_empresa/${idSuscripcion}/`)
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

}