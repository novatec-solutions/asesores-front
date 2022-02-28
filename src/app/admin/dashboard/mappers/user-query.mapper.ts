function mapNestedData( item ) {
    return item.reduce( (current, next) => {
        return {
            ...current,
            ...next,
        }  
    }, {});
}

export function mapSubscriptions({ response }) {
    const { suscripciones } = response;
    return suscripciones.map( item => {
        return mapNestedData(item);
    });
};

export function mapDevices({ response }) {
    const { Dispositivos } = response;
    return Dispositivos.map( item => {
        return mapNestedData(item);
    });
}