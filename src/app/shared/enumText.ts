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
            case 'title':
                return 'Titulo';
            case 'ipUser':
                return 'IP usuario';
            case 'lastTime':
                return 'Último tiempo de visualización';
            case 'maxTime':
                return 'Tiempo máximo de visualización';
            case 'highDate':
                return 'Fecha de Alta';
            case 'dateExpiry':
                return 'Fecha de Expiración';
            case 'price':
                return 'Precio';
            case 'payMethod':
                return 'Medio de pago';
            case 'actions':
                return 'Acciones';
            case 'origin':
                return 'Origen';
            case 'paidStatus':
                return 'Estado pago';
            case 'payDetail':
                return 'Detalle abono';
            case 'actionDetail':
                return 'Detalle acción';
            case 'device':
                return 'Dispositivo';
            case 'name':
                return 'Nombre';
            case 'serial':
                return 'Product ID / Serial';
            case 'actDate':
                return 'Fecha de activación';
        }
    }
}