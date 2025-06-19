import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Producto from "../classes/Producto.js";
import ProductoMin from "./ProductoMin.js";
import { productosContext } from "../context/productosContext.js";
import { SocketContext } from "../context/WebSocketContext.js";
import actualizarProductos from "../services/actualizacionProductos.js";
import { CarroContext } from "../context/CarroContext.js";


function Home() {
    const { productos, setProductos } = useContext(productosContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { socket } = useContext(SocketContext);
    const {carro} = useContext(CarroContext);
    const [actualizar, setActualizar] = useState(true);
    const [productosCargados, setProductosCargados] = useState(false);



    useEffect(() => {
        if (productos.length === 0) { 
            fetch("http://localhost:3001/productos")
                .then((response) => response.json())
                .then((data) => {
                    const arrayProductos = data.map(
                        (item) =>
                            new Producto(
                                item.id,
                                item.nombre,
                                item.descripcion,
                                item.precio,
                                item.stock,
                                item.imagen,
                                item.categoria
                            )
                    );
                    setProductos(arrayProductos);
                   
                });
        } else {
            console.log('Productos actualizados en Home, sin recargar desde API.');
            if (carro && carro.length > 0) {
                console.log(`informacion de carro en home: ${carro[0].producto.nombre}, ${carro[0].cantidad}`);
            }
        }
    }, [productos,carro]);


    
    

    return (
        <div>
            <ul style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: '10px',
                padding: 0,
                listStyle: 'none'
            }}>
                {productos.map((producto) => (
                    <li key={producto.id}><ProductoMin producto={producto} /></li>
                ))}
            </ul>
        </div>
    );
}

export default Home;