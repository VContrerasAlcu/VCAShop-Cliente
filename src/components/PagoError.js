import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PagoError = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom color="error">
        ❌ Algo salió mal con tu pago
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        El pago no pudo completarse o fue cancelado. Puedes intentarlo de nuevo desde tu carrito.
      </Typography>
      <Button variant="outlined" onClick={() => navigate("/carro")}>
        Volver al carrito
      </Button>
    </Box>
  );
};

export default PagoError;