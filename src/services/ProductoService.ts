
import { Producto } from "../models/Producto";
import apiClient from "./interceptor";

export class ProductoService {
    getProductoList() {
        return new Promise<Producto[]>((resolve, reject) => {
            apiClient.get('productos/')
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

}