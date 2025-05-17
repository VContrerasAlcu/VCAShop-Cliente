import { Card, CardActions, Box, Button, CardContent, CardMedia, Typography, IconButton, TextField, Tooltip } from "@mui/material";
import { productoContext } from "../context/productoContext.js";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { CarroContext } from "../context/CarroContext.js";
import { ClienteContext } from "../context/ClienteContext.js";


function ProductoMax(){
    const {productoEnContext} = useContext(productoContext);
    const navigate = useNavigate();
    const [cantidad, setCantidad] = useState(0);
    const {carro, setCarro} = useContext(CarroContext);
    const {cliente} = useContext(ClienteContext);
  
    const handleCarrito = () => {
        if (cliente) {
            const exito = carro.agregar(productoEnContext,cantidad);
            if (exito) {
                setCarro(carro);
                alert('Producto añadido al carrito correctamente')
            }
            else alert('Error al añadir el producto al carrito');
        }
        else {
            navigate('/validacion');
        }
        
    };

    const handleVolver = () => {
        navigate(-1); 
    };

    const aumentarCantidad = () => {
        setCantidad(cantidad + 1);
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) setCantidad(cantidad - 1);
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                    <IconButton color="primary" onClick={disminuirCantidad}>
                        <RemoveIcon />
                    </IconButton>
                    <TextField
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                        sx={{ width: "60px", textAlign: "center" }}
                        inputProps={{ min: 1 }}
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