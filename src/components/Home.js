
import { useEffect, useState } from "react";
import Producto from "../classes/Producto.js";

function Home(){
    const [productos, setProductos] = useState([]);
    useEffect(()=>{
        fetch('localhost:3001/productos')
        .then((response) => response.json)
        .then((data) => {
            const arrayProductos = data.map(
                (item) => new Producto(item.id, item.nombre, item.descripcion,
                                      item.precio, item.stock, item.imagen,
                                      item.categoria)
                );
        
            setProductos(arrayProductos);
        }
        )
        }
    ,[]);

    return (
        <div>
            {productos.forEach((item) => item.mostrar())}
        </div>
    )
};

export default Home;