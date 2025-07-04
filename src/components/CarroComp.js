
import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductoCarro from "./ProductoCarro.js";
import { CarroContext } from "../context/CarroContext.js";
import { useContext } from "react";
import { SocketContext } from "../context/WebSocketContext.js";
import { ClienteContext } from "../context/ClienteContext.js";
import Carro from "../classes/Carro.js";

const CarroComp = () => {
    const {socket} = useContext(SocketContext);
    const {cliente} = useContext(ClienteContext);
    const navigate = useNavigate();
    const {carro, setCarro} = useContext(CarroContext);
    const totalCarro = carro.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);





    const volver = async () => {
    const nuevoCarro = new Carro(carro, socket, cliente);    
        for (const item of carro) {
            await nuevoCarro.agregar(item.producto, item.cantidad); 
        }

        setCarro([...nuevoCarro.contenido]); // 🔥 Actualiza el contexto
        navigate(-1); // Vuelve a la pantalla anterior
    };

 

    return (
        <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
            <Typography variant="h4" align="center" gutterBottom>
                Tu Carrito 🛒
            </Typography>

            {/* Contenedor de productos */}
            <Paper sx={{ p: 2, mb: 3 }}>
                {carro.length > 0 ? (
                    carro.map(({producto,cantidad}) => (
                       <Box key={producto.id} sx={{ mb: 2 }}> 
                            {/* Renderizar el componente ProductoCarro */}
                            <ProductoCarro producto={producto} cantidad={cantidad} />
                        </Box>

                    ))
                ) : (
                    <Typography variant="h6" align="center">
                        No hay productos en el carrito.
                    </Typography>
                )}
                </Paper>
                {carro.length > 0 && (
                    <Typography variant="h5" align="right" sx={{ fontWeight: "bold", mt: 2, color: "darkblue" }}>
                        Total: {totalCarro.toFixed(2)} €
                    </Typography>
                )}



            {/* Botones de acción */}
            <Box sx={{ display: "flex", justifyContent: carro.length > 0 ? "space-between" : "center", mt: 3 }}>
            <Button variant="contained" color="secondary" onClick={volver}>
                Volver
            </Button>
            {carro.length > 0 && (
                <Button variant="contained" color="primary" onClick={() => navigate("/compra")}>
                Comprar
                </Button>
            )}
            </Box>
        </Box>
    );
};

export default CarroComp;