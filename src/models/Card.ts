export interface Card {
  id:               number;
  usuario_data:     UsuarioData;
  nombre_titular:   string;
  numero_tarjeta:   string;
  fecha_expiracion: string;
  cvv:              string;
  es_visa:          boolean;
  creado_en:        Date;
  usuario:          number;
}

export interface UsuarioData {
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
