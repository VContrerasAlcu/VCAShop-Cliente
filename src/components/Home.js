import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Producto from "../classes/Producto.js";
import ProductoMin from "./ProductoMin.js";
import { productosContext } from "../context/productosContext.js";
import { SocketContext } from "../context/WebSocketContext.js";
import actualizarProductos from "../services/actualizacionProductos.js";
import { CarroContext } from "../context/CarroContext.js";
import { productoEnCarro } from "../services/utilsCarro.js";
import { CategoriaContext } from "../context/CategoriaContext.js";
import { ClienteContext } from "../context/ClienteContext.js";


function Home() {
    const { productos, setProductos } = useContext(productosContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { socket } = useContext(SocketContext);
    const {carro} = useContext(CarroContext);
    const [actualizar, setActualizar] = useState(true);
    const [productosCargados, setProductosCargados] = useState(false);
    const {categoriaSeleccionada, setCategoriaSeleccionada} = useContext(CategoriaContext);
    const {cliente} = useContext(ClienteContext);



    useEffect(() => {
        if (!categoriaSeleccionada) setCategoriaSeleccionada('destacados');
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
                                item.categoria,
                                item.destacado
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
    }, [productos, carro, categoriaSeleccionada]);


    
    

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
                    carro ? 
                        !productoEnCarro(producto,carro) ?  categoriaSeleccionada !== 'destacados' ? producto.categoria === categoriaSeleccionada ? <li key={producto.id}><ProductoMin producto={producto} /></li>
                                                                                                                                                  : null
                                                                                                   : producto.destacado ? <li key={producto.id}><ProductoMin producto={producto} /></li>
                                                                                                                        : null
                                                                                                    
                                                         : null
                           : categoriaSeleccionada !== 'destacados' ? producto.categoria === categoriaSeleccionada ? <li key={producto.id}><ProductoMin producto={producto} /></li>
                                                                                                                   : null
                                                                    : producto.destacado ? <li key={producto.id}><ProductoMin producto={producto} /></li>
                                                                                         : null
                 
                    
                ))}
            </ul>
        </div>
    );
}

export default Home;