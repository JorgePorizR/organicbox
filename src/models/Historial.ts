export interface Historial {
  id:               number;
  costo_total:      string;
  usuario_data:     UsuarioData;
  suscripcion_data: SuscripcionData;
  metodo_pago_data: null;
  productos_data:   ProductosDatum[];
  fecha_validez:    Date;
  fecha_compra:     Date;
  confirmada:       boolean;
  usuario:          number;
  suscripcion:      number;
  metodo_pago:      null;
  productos:        number[];
}

export interface ProductosDatum {
  id:           number;
  nombre:       string;
  descripcion:  string;
  costo_puntos: string;
}

export interface SuscripcionData {
  id:                 number;
  nombre:             string;
  frecuencia:         string;
  monto_total_puntos: string;
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
