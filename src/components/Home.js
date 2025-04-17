
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Producto from "../classes/Producto.js";

function Home(){
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch('http://localhost:3001/productos')
        .then((response) => response.json())
        .then((data) => {
            const arrayProductos = data.map(
                (item) => new Producto(item.id, item.nombre, item.descripcion,
                                      item.precio, item.stock, item.imagen,
                                      item.categoria,navigate)
                );
        
            setProductos(arrayProductos);
            
        }
        )
        }
    ,[]);

    return (
        <div >
            <ul style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'space-between', 
                    gap: '10px', 
                    padding: 0, 
                    listStyle: 'none' 
                    }}>

                {productos.map((producto) => (
                    <li>{producto.mostrarDetalles()}</li>
                )
            )}
                    
            </ul>
        </div>
    )
};

export default Home;