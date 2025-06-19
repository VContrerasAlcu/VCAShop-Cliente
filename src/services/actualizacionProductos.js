


export default function actualizarProductos(productos, producto) {
    return productos.map(item => 
        item.id === producto.id ? { ...producto } : { ...item }
    );
}