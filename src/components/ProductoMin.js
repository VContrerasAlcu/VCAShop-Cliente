import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ProductoMin({producto}){
    const navigate = useNavigate();
    return (
      <Card sx={{ maxWidth: 200, height: 400, display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          alt={producto.nombre}
          image={producto.imagen}
          sx={{ width: '100%', height: 150, objectFit: 'cover' }} 
        />
        <CardContent sx={{ flexGrow: 1, minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="div" 
            sx={{ minHeight: 60, maxHeight: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
          >
            {producto.nombre}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ fontWeight: 'bold', color: 'darkblue', textAlign: 'center' }}
          >
            {producto.precio} €
          </Typography>

          <Typography 
            variant="body2" 
            sx={{ color: 'text.secondary', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', height: 40 }}
          >
            {producto.descripcion}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '10px' }}>
          <Button size="small">Comprar</Button>
          <Button size="small" onClick={() => navigate('/detalles',{state: {producto: producto}})}>Más información</Button>
        </CardActions>
      </Card>
      );
}

  export default ProductoMin;