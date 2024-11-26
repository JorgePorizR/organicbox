//import axios from "axios";

import { Auth } from "../models/Auth";
import { Usuario } from "../models/Usuario";
import apiClient from "./interceptor";

export class UserService {
    userCreate(usuario: Usuario): Promise<Usuario> {
        return new Promise<Usuario>((resolve, reject) => {
            apiClient
                .post('usuarios/', usuario)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error('Error al crear el usuario:', error);
                    reject(error);
                });
        });
    }

    userLogin(username: string, password: string): Promise<Auth> {
        return new Promise<Auth>((resolve, reject) => {
            apiClient
                .post('login/', { username, password })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error('Error al iniciar sesión:', error);
                    reject(error);
                });
        });
    }

}