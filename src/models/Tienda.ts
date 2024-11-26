import { Usuario } from "./Usuario";

export interface Tienda {
    nombre:      string;
    descripcion: string;
    direccion:   string;
    telefono:    string;
    propietario: Usuario;
}