
class Producto{
    constructor(id, nombre, descripcion, precio, stock, imagen, categoria){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = /*"http://localhost:3001" + */imagen;
        this.categoria = categoria;
       
    }
}

export default Producto;