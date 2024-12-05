//import axios from "axios";

import { AddCard } from "../models/AddCard";
import { Auth } from "../models/Auth";
import { Card } from "../models/Card";
import { Historial } from "../models/Historial";
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

    getHistorialByUser(userId: string): Promise<Historial[]> {
        return new Promise<Historial[]>((resolve, reject) => {
            apiClient
                .get(`usuarios/${userId}/get_all_compras_from_user/`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error('Error al obtener el historial:', error);
                    reject(error);
                });
        });
    }

    getCardsByUser(userId: string): Promise<Card[]> {
        return new Promise<Card[]>((resolve, reject) => {
            apiClient
                .get(`usuarios/${userId}/get_metodos_pago/`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error('Error al obtener las tarjetas:', error);
                    reject(error);
                });
        });
    }

    addCardByUser(userId: string, card: AddCard): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            apiClient
                .post(`usuarios/${userId}/add_metodo_pago/`, card)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error('Error al agregar la tarjeta:', error);
                    reject(error);
                });
        });
    }

}