

class Carro{
    

    constructor(contenido = [], socket, cliente){
        this.contenido = contenido;
        this.socket = socket;
        this.cliente = cliente;
        
    }

    agregar(producto, cantidad) {
        return new Promise((resolve, reject) => {
            this.socket.emit("agregar", { cliente: this.cliente, producto, cantidad });
            this.socket.once("respuesta_agregar", (respuesta) => {
            if (respuesta === false) {
                console.log("Error respuesta_agregar");
                reject(false);
            } else {
                this.contenido = [...respuesta];
                console.log("Carro actualizado en agregar:", this.contenido);
                resolve(this.contenido);
            }
            });
        });
    }
    quitar(producto){
        return new Promise((resolve, reject) => {
            this.socket.emit("quitar", { cliente: this.cliente, producto});
            this.socket.once("respuesta_quitar", (respuesta) => {
            if (respuesta === false) {
                console.log("Error respuesta_quitar");
                reject(false);
            } else {
                this.contenido = [...respuesta];
                console.log("Carro actualizado en quitar:", this.contenido);
                resolve(this.contenido);
            }
            });
        });
    }


    vaciar(){
        this.contenido = null;
        let completado = false;
        this.socket.emit('vaciar', {cliente:this.cliente});
        this.socket.on('respuesta_vaciar', (respuesta) => {
            completado = respuesta;
        });
        return completado;
    }


    
    numProductos(){
        return this.contenido.length;
    }

    
}

export default Carro