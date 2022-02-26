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
            case 'lastTime':
                return 'Último tiempo de visualización';
            case 'maxTime':
                return 'Tiempo máximo de visualización';
            case 'actions':
                return 'Acciones';
            // Suscripciones
            case 'descripcion':
                return 'Titulo';
            case 'origen':
                return 'Origen';
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
            case 'medioPago':
                return 'Medio de pago';
            case 'estadoPago':
                return 'Estado pago';
            case 'payDetail':
                return 'Detalle abono';
            case 'detalleAccion':
                return 'Detalle acción';
            // Dispositivos
            case 'tipoDispositivo':
                return 'Dispositivo';
            case 'nombreDispositivo':
                return 'Nombre';
            case 'idDispositivo':
                return 'Product ID / Serial';
            case 'fechaActivacion':
                return 'Fecha de activación';
        }
    }
}