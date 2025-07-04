

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


    vaciar() {
        return new Promise((resolve) => {
            console.log(`envio a servidor desde vaciar. cliente: ${this.cliente.email}`);
            this.socket.emit("vaciar", { cliente: this.cliente });
            this.socket.once("respuesta_vaciar", (respuesta) => {
                this.contenido = [];
                resolve(respuesta); // true o false
            });
        });
    }


    
    numProductos(){
        return this.contenido.length;
    }

    
}

export default Carro