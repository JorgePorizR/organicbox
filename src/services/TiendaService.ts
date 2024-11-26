import { Tienda } from "../models/Tienda";
import apiClient from "./interceptor";

export class TiendaService {
    getTiendaList() {
        return new Promise<Tienda[]>((resolve, reject) => {
            apiClient.get('empresas/')
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

}