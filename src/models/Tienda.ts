import { Usuario } from "./Usuario";

export interface Tienda {
    id?:          string;
    nombre:      string;
    descripcion: string;
    direccion:   string;
    telefono:    string;
    propietario: Usuario;
}