import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, Avatar, Button, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CarroContext } from "../context/CarroContext.js";
import Carro from "../classes/Carro.js";
import { ClienteContext } from "../context/ClienteContext.js";
import { SocketContext } from "../context/WebSocketContext.js";
import Producto from "../classes/Producto.js";
import actualizarProductos from "../services/actualizacionProductos.js";
import { productosContext } from "../context/productosContext.js";
import { useNavigate } from "react-router-dom";


const ProductoCarro = ({ producto, cantidad}) => {
    const {carro, setCarro} = useContext(CarroContext);
    const [cantidadProducto, setCantidadProducto] = useState(
            carro.find(item => item.producto.id === producto.id)?.cantidad || 1
        );
    const {cliente} = useContext(ClienteContext);
    const {socket} = useContext(SocketContext);
    const {productos, setProductos} = useContext(productosContext);
    const navigate = useNavigate();

    // Calcula el precio total dinámicamente
    const precioTotal = producto.precio * cantidadProducto;
   

    // Funciones para modificar la cantidad
    //const aumentarCantidad = () => setCantidad(cantidadProducto + 1);
    //const disminuirCantidad = () => cantidadProducto > 1 && setCantidad(cantidadProducto - 1);
    const actualizarCantidad = (nuevaCantidad) => {
        if (nuevaCantidad < 1) return;

        // Actualizar la cantidad en el contexto del carro
        const nuevoCarro = carro.map(item =>
            item.producto.id === producto.id ? { ...item, cantidad: nuevaCantidad } : item
        );

        setCarro(nuevoCarro);

        // 🔥 Verificar si el producto también está en `productos`
        const productoActualizado = productos.find(p => p.id === producto.id);
        if (productoActualizado) {
            productoActualizado.stock -= (nuevaCantidad - cantidadProducto);
            setProductos([...productos]); // 🔥 Fuerza la actualización de estado
        }

        setCantidadProducto(nuevaCantidad);
    };


    const eliminarProducto = async (producto) => {
        if (cliente) {  
            
            const nuevoCarro = new Carro(carro, socket, cliente);
            console.log(`dentro de handle carrito. carro:  ${nuevoCarro.socket}, ${nuevoCarro.cliente.email}`);
            const resultado = await nuevoCarro.quitar(producto);
            if (resultado !== false) {
                //console.log(`nuevocarro contenido tras agregar: ${nuevoCarro.contenido[0].producto.nombre}`);
                setCarro([...nuevoCarro.contenido]);
                const productoActualizado = productos.find(p => p.id == producto.id);
                if (productoActualizado) {
                    productoActualizado.stock += cantidadProducto; // devolvemos al stock
                    setProductos([...productos]); // Forzamos actualización de contexto
                }



                /*setCarro(carro);
                const productoActualizado = actualizarStock(productoEnContext, cantidad);
                setProducto(productoActualizado);
                const productosActualizado = actualizarProductos(productoActualizado, productos); 
                setProductos(productosActualizado);*/
                socket.on("stock_actualizado", (productoRecibido) => {
                    console.log(`estoy en on stock actualizado. producto recibido: ${productoRecibido.nombre}, ${productoRecibido.stock}`);
                    const productoNuevo = new Producto(productoRecibido.id,
                                                  productoRecibido.nombre,
                                                  productoRecibido.descripcion,
                                                  productoRecibido.precio,
                                                  productoRecibido.stock,
                                                  productoRecibido.imagen,
                                                  productoRecibido.categoria);
                    setProductos(prevProductos => {
                        const productosActualizados = actualizarProductos(prevProductos, productoNuevo);
                        return [...productosActualizados];
                    });


                     // Crear una COPIA PROFUNDA del array actual para evitar mutaciones
                    //const productosCopy = JSON.parse(JSON.stringify(productos));
                    
                    // Actualizar el producto específico
                    /* productosActualizados = productosCopy.map(item => 
                        item.id === producto.id ? { ...producto } : item
                    );*/
                    
                    
                    //console.log(`prueba de productos actualizados. ${productosActualizados[0].nombre}, ${productosActualizados[0].stock}`);
                    //setProductos([...productosActualizados]);
                    //setProductos(productosActualizados.map(producto => ({ ...producto })));
                                      
                
                });


                
            }
            else alert('Error al añadir el producto al carrito');
        }
        else {
            navigate('/validacion');
        }
        
    };

    /*useEffect(() => {
        // Esto es como un "destructor" que se llama cuando el componente se desmonta
        return () => {
            socket.off("stock_actualizado");
        };
    }, [socket]);*/

    

    return (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
            {/* Imagen del producto */}
            <Avatar variant="square" src={producto.imagen} sx={{ width: 80, height: 80 }} />

            {/* Nombre y cantidad */}
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{producto.nombre}</Typography>
                
                <Stack direction="row" spacing={1} alignItems="center">
                    <Button variant="outlined" size="small" onClick={() => actualizarCantidad(cantidad - 1)}>-</Button>
                    <Typography variant="body1">{cantidadProducto}</Typography>
                    <Button variant="outlined" size="small" onClick={() => actualizarCantidad(cantidad + 1)}>+</Button>
                </Stack>
            </Box>

            {/* Precio total */}
            <Typography variant="h6" color="primary">{precioTotal.toFixed(2)} €</Typography>

            {/* Botón de eliminar */}
            <IconButton color="error" onClick={() => eliminarProducto(producto)}>
                <DeleteIcon />
            </IconButton>
        </Stack>
    );
};

export default ProductoCarro;