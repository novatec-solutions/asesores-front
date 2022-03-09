export class enums{
    public static account(type:number){
        switch(type){
            case 1:
                return 'email';
            case 2:
                return 'hogar';
            case 3:
                return 'movil';
        }
    }
    public static table(title:string){
        switch(title){
            // Suscripciones
            case 'descripcion':
                return 'Titulo';
            case 'ipUsuario':
                return 'IP usuario';
            case 'fechaAlta':
                return 'Fecha de Alta';
            case 'fechaExpiracion':
                return 'Fecha de Expiración';
            case 'precio':
                return 'Precio';
            case 'medioPago':
                return 'Medio de pago';
            case 'estadoPago':
                return 'Estado pago';
            case 'payDetail':
                return 'Detalle abono';
            case 'detalleAccion':
                return 'Detalle acción';
            case 'actions':
                return 'Acciones';
            // Dispositivos
            case 'tipoDispositivo':
                return 'Dispositivo';
            case 'nombreDispositivo':
                return 'Nombre';
            case 'fechaActivacion':
                return 'Fecha de activación';
        }
    }
}