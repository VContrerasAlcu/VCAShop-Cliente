import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

class Producto{
    constructor(id, nombre, descripcion, precio, stock, imagen, categoria){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = "http://localhost:3001/" + imagen;
        this.categoria = categoria;
    }

   mostrarDetalles(){
    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt={this.nombre}
            height="50"
            image={this.imagen}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {this.nombre}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {this.descripcion}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      );
   }
}

export default Producto;