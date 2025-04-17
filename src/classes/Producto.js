import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


class Producto{
    constructor(id, nombre, descripcion, precio, stock, imagen, categoria, navigate){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = "http://localhost:3001" + imagen;
        this.categoria = categoria;
        this.navigate = navigate;
    }

    mostrarDetalles(){  
      return (
        <Card sx={{ maxWidth: 200, height: 400, display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component="img"
            alt={this.nombre}
            image={this.imagen}
            sx={{ width: '100%', height: 150, objectFit: 'cover' }} 
          />
          <CardContent sx={{ flexGrow: 1, minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography 
              gutterBottom 
              variant="h5" 
              component="div" 
              sx={{ minHeight: 60, maxHeight: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
            >
              {this.nombre}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ fontWeight: 'bold', color: 'darkblue', textAlign: 'center' }}
            >
              {this.precio} €
            </Typography>

            <Typography 
              variant="body2" 
              sx={{ color: 'text.secondary', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', height: 40 }}
            >
              {this.descripcion}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '10px' }}>
            <Button size="small">Comprar</Button>
            <Button size="small" onClick={() => this.desplazarse('/detalles')}>Más información</Button>
          </CardActions>
        </Card>
        );
    }

    desplazarse(ruta){
        const producto = {
          id: this.id,
          nombre: this.nombre,
          descripcion: this.descripcion,
          precio: this.precio,
          stock: this.stock,
          imagen: this.imagen,
          categoria: this.categoria

        }
        this.navigate(ruta, {state: {producto: producto}});
    }
}

export default Producto;