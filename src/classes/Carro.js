

class Carro{
    

    constructor(contenido=null, socket, cliente){
        this.contenido = contenido;
        this.socket = socket;
        this.cliente = cliente;
        
    }
    agregar(producto, cantidad){
        let problema = false;
        this.socket.emit('agregar',{cliente:this.cliente, contenido:this.contenido,producto,cantidad});
        this.socket.on('respuesta_agregar', (respuesta) => {
            if (respuesta === false) problema = true;
            else this.contenido = respuesta;
        });

        if (problema) return false;
        else return true;
    }

    quitar(producto, cantidad){
        let problema = false;
        this.socket.emit('quitar',{cliente:this.cliente, contenido:this.contenido,producto,cantidad});
        this.socket.on('respuesta_quitar', (respuesta) => {
            if (respuesta === false) problema = true;
            else this.contenido = respuesta;
        });

        if (problema) return false;
        else return true;
    }


    vaciar(){
        this.contenido = null;
    }


    
    numProductos(){
        return this.contenido.length;
    }

    
}

export default Carro