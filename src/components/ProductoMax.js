import { Card, CardActions, Box, Button, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProductoMax({producto}){
    const navigate = useNavigate();
    return(
        <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, padding: 2 }}>
        <CardMedia
        component="img"
        height="300"
        image={producto?.imagen}
        alt={producto?.nombre}
        />
        <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
            {producto?.nombre}
        </Typography>
        <Typography variant="h6" color="text.secondary">
            {producto?.categoria}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
            {producto?.descripcion}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2, color: "darkblue" }}>
            {producto?.precio} €
        </Typography>
        </CardContent>
        <CardActions>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/compra', {state: {producto: producto}})}>
                Comprar
            </Button>
        </Box>
        </CardActions>

        </Card>
    )
}

export default ProductoMax;