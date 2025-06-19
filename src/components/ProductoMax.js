import { Card, CardActions, Box, Button, CardContent, CardMedia, Typography, IconButton, TextField, Tooltip } from "@mui/material";
import { productoContext } from "../context/productoContext.js";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { CarroContext } from "../context/CarroContext.js";
import { ClienteContext } from "../context/ClienteContext.js";
import Carro from "../classes/Carro.js";
import { SocketContext } from "../context/WebSocketContext.js";
import { productosContext } from "../context/productosContext.js";
import CircularProgress from "@mui/material/CircularProgress";
import actualizarProductos from "../services/actualizacionProductos.js";
import Producto from "../classes/Producto.js";


function actualizarStock(producto, cantidad){
    producto.stock -= cantidad;
    return producto;
}




function ProductoMax(){
    const {productoEnContext, setProducto} = useContext(productoContext);
    const navigate = useNavigate();
    const [cantidad, setCantidad] = useState(0);
    const {socket} = useContext(SocketContext);
    const {carro, setCarro} = useContext(CarroContext);
    const {cliente} = useContext(ClienteContext);
    const {productos, setProductos} = useContext(productosContext);
    

  
    const handleCarrito = async () => {
        if (cliente) {
            
            
            const nuevoCarro = new Carro(carro, socket, cliente);
            console.log(`dentro de handle carrito. carro:  ${nuevoCarro.socket}, ${nuevoCarro.cliente.email}`);
            const resultado = await nuevoCarro.agregar(productoEnContext,cantidad);
            if (resultado !== false) {
                console.log(`nuevocarro contenido tras agregar: ${nuevoCarro.contenido[0].producto.nombre}`);
                setCarro([...nuevoCarro.contenido]);
                /*setCarro(carro);
                const productoActualizado = actualizarStock(productoEnContext, cantidad);
                setProducto(productoActualizado);
                const productosActualizado = actualizarProductos(productoActualizado, productos); 
                setProductos(productosActualizado);*/
                navigate('/');
                socket.on("stock_actualizado", (productoRecibido) => {
                    console.log(`estoy en on stock actualizado. producto recibido: ${productoRecibido.nombre}, ${productoRecibido.stock}`);
                    const productoActualizado = new Producto(productoRecibido.id,
                                                  productoRecibido.nombre,
                                                  productoRecibido.descripcion,
                                                  productoRecibido.precio,
                                                  productoRecibido.stock,
                                                  productoRecibido.imagen,
                                                  productoRecibido.categoria);
                    
                    const actualizados = actualizarProductos(productos,productoActualizado);
                    setProductos([...actualizados]);
                    

                    

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
   
    /*const productoEnProductos = productos.find((producto) => producto.id === 6);
    console.log(`stock en el array context productos: ${productoEnProductos.stock}`);*/

    const handleVolver = () => {
        navigate('/'); 
    };

    const aumentarCantidad = () => {
        setCantidad(cantidad + 1);
    };

    const disminuirCantidad = () => {
        if (cantidad > 0) setCantidad(cantidad - 1);
    };


  
    return(
        <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, padding: 2 }}>
        <CardMedia
        component="img"
        height="300"
        image={productoEnContext?.imagen}
        alt={productoEnContext?.nombre}
        />
        <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
                {productoEnContext?.nombre}
            </Typography>
            <Typography variant="h6" color="text.secondary">
                {productoEnContext?.categoria}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                {productoEnContext?.descripcion}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2, color: "darkblue" }}>
                {productoEnContext?.precio} €
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2, color: "darkblue" }}>
                {productoEnContext?.stock} stock
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                    <IconButton color="primary" onClick={disminuirCantidad}>
                        <RemoveIcon />
                    </IconButton>
                    <TextField
                        type="number"
                        value={cantidad}
                        onChange={(e) => {
                            const nuevoValor = parseInt(e.target.value) || 1;
                            setCantidad(nuevoValor < 1 ? 1 : nuevoValor);
                        }}
                        sx={{ width: "60px", textAlign: "center" }}
                        inputProps={{ inputMode: "numeric", min: 1 }}
                    />
                    <IconButton color="primary" onClick={aumentarCantidad}>
                        <AddIcon />
                    </IconButton>
            </Box>

        </CardContent>
        <CardActions>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                
                <Tooltip title="Seguir comprando">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={handleVolver} 
                        sx={{ fontSize: 24, padding: 1.5, minWidth: "150px" }}
                    >
                        <ArrowBackIcon sx={{ fontSize: 30 }} />
                    </Button>
                </Tooltip>
        
                
                <Tooltip title="Añadir a carrito">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleCarrito} 
                        sx={{ fontSize: 24, padding: 1.5, minWidth: "150px" }}
                    >
                        <ShoppingCartIcon sx={{ fontSize: 30 }} />
                    </Button>
                </Tooltip>
            </Box>
        </CardActions>

        </Card>
    )
}

export default ProductoMax;