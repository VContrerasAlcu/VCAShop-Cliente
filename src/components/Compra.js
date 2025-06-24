import { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Avatar,
  Tooltip,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { ClienteContext } from "../context/ClienteContext.js";
import { CarroContext } from "../context/CarroContext.js";
import { useNavigate } from "react-router-dom";
import actualizarCliente from "../services/actualizacionClientes.js";

const Compra = () => {
  const { cliente, setCliente } = useContext(ClienteContext);
  const { carro } = useContext(CarroContext);
  const navigate = useNavigate();
  const [direccion, setDireccion] = useState(cliente?.direccion || "");
  const [errorDireccion, setErrorDireccion] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const total = carro.reduce(
    (acumulado, item) => acumulado + item.producto.precio * item.cantidad,
    0
  );

  const handleActualizarDireccion = async () => {
    if (direccion.trim()) {
      const clienteActualizado = { ...cliente, direccion: direccion.trim() };
      const respuestaCorrecta = await actualizarCliente(clienteActualizado);

      if (respuestaCorrecta) {
        setCliente(clienteActualizado);
        sessionStorage.setItem("cliente", JSON.stringify(clienteActualizado));
        setOpenSuccess(true);
      } else {
        setOpenError(true);
      }
    }
  };
  const enviarPagoARedsys = async () => {
    try {
      const respuesta = await fetch("http://localhost:3001/pago/generarPago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cliente, carro, total })
      });

      const data = await respuesta.json();

      console.log(`respuesta del servidor en la compra redsys: ${data}`);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.url;

      const campos = {
        Ds_SignatureVersion: data.version,
        Ds_MerchantParameters: data.params,
        Ds_Signature: data.signature
      };

      for (const [key, value] of Object.entries(campos)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error al generar el formulario de pago:", error);
      setOpenError(true);
    }
  };
  
  const handlePagar = async () => {
    if (!direccion.trim()) {
      setErrorDireccion(true);
      return;
    }

    setErrorDireccion(false);
    await handleActualizarDireccion();
    await enviarPagoARedsys(); // 🔥 Aquí lanzamos el pago Redsys
  };

  const handleVolver = () => {
    navigate(-1);
  };

  useEffect(()=>{
    if (!cliente.nombre){
      navigate('/datosCliente');
    }
  },[])

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, p: 3 }}>
      {/* Logo */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Avatar
          src="/images/logo.png"
          alt="Logo"
          sx={{ width: 100, height: 100, mx: "auto" }}
        />
      </Box>

      {/* Datos del cliente */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Datos del cliente
        </Typography>

        {/* Nombre (solo lectura) */}
        <TextField
          fullWidth
          variant="outlined"
          label="Nombre del cliente"
          value={cliente?.nombre || ""}
          InputProps={{ readOnly: true }}
          sx={{ mb: 3 }}
        />

        {/* Dirección + botón de guardar */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Dirección de envío"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Introduce tu dirección de envío"
            error={errorDireccion}
            helperText={errorDireccion ? "Por favor, introduce una dirección" : ""}
          />
          <Tooltip title="Actualizar  dirección">
            <IconButton
              color="primary"
              onClick={handleActualizarDireccion}
              sx={{ mt: "4px" }}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Snackbar
            open={openSuccess}
            autoHideDuration={3000}
            onClose={() => setOpenSuccess(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="success" variant="filled" onClose={() => setOpenSuccess(false)}>
              Dirección guardada correctamente
            </Alert>
          </Snackbar>

          <Snackbar
            open={openError}
            autoHideDuration={3000}
            onClose={() => setOpenError(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="error" variant="filled" onClose={() => setOpenError(false)}>
              No se pudo guardar la dirección. Inténtalo de nuevo.
            </Alert>
          </Snackbar>
        </Box>
      </Paper>

      {/* Resumen del pedido */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Resumen del pedido
        </Typography>

        {carro.map((item) => (
          <Box key={item.producto.id} sx={{ my: 1 }}>
            <Typography>
              {item.cantidad} × {item.producto.nombre} —{" "}
              {(item.producto.precio * item.cantidad).toFixed(2)} €
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" align="right" sx={{ fontWeight: "bold" }}>
          Total: {total.toFixed(2)} €
        </Typography>
      </Paper>

      {/* Botones */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="secondary" onClick={handleVolver}>
          Volver
        </Button>
        <Button variant="contained" color="primary" onClick={handlePagar}>
          Pagar
        </Button>
      </Box>
    </Box>
  );
};

export default Compra;