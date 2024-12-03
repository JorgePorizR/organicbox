import { Compra } from "../models/Compra";
import apiClient from "./interceptor";

export class CompraService {
    createCompra(compra: Compra) {
        return new Promise<void>((resolve, reject) => {
            apiClient.post('compras/', compra)
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

}