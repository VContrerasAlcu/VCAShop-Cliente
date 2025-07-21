
class Producto{
    constructor(id, nombre, descripcion, precio, stock, imagen, categoria, destacado = false){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = /*"http://localhost:3001" + */imagen;
        this.categoria = categoria;
        this.destacado = destacado
       
    }
}

export default Producto;