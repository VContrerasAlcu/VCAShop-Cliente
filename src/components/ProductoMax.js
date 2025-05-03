import { Card, CardActions, Box, Button, CardContent, CardMedia, Typography } from "@mui/material";
import { productoContext } from "../context/productoContext.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function ProductoMax(){
    const {productoEnContext} = useContext(productoContext);
    const navigate = useNavigate();
   
    const handleComprar = () => {
        navigate("/compra");
    }
  
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
        </CardContent>
        <CardActions>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="primary" onClick={handleComprar}>
                Comprar
            </Button>
        </Box>
        </CardActions>

        </Card>
    )
}

export default ProductoMax;