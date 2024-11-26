export interface Empresa {
  id:               number;
  propietario_data: PropietarioData;
  nombre:           string;
  descripcion:      string;
  direccion:        string;
  telefono:         string;
  fecha_creacion:   Date;
  propietario:      number;
}

export interface PropietarioData {
  id:          number;
  user:        User;
  is_Admin:    boolean;
  has_Empresa: boolean;
}

export interface User {
  id:         number;
  username:   string;
  first_name: string;
  last_name:  string;
  email:      string;
}
