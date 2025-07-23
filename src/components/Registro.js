import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const [fase, setFase] = useState("inicio"); // 'inicio', 'codigo', 'completado'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Paso 1: enviar email y contraseña al servidor
  const enviarDatosIniciales = async () => {
    setError("");
    setMensaje("");
    if (formData.password !== formData.confirmPassword) {
      setError("La contraseña y su confirmación no coinciden.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/clientes/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      const data = await res.json();

      if (res.ok) {
        setMensaje("Se ha enviado un código de verificación a tu correo.");
        setFase("codigo");
      } else {
        setError(data.error || "Error al registrar el cliente.");
      }
    } catch (err) {
      setError("No se pudo conectar al servidor.");
    }
  };

  // Paso 2: verificar el código
  const verificarCodigo = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:3001/clientes/verificar-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          codigo
        })
      });
      const data = await res.json();

      if (res.ok) {
        setMensaje("Registro completo. Puedes iniciar sesión.");
        setFase("completado");
      } else {
        setError(data.error || "El código es incorrecto o expiró.");
      }
    } catch (err) {
      setError("No se pudo conectar al servidor.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 420,
        margin: "auto",
        mt: 6,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff"
      }}
    >
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <img src="/images/logo.png" alt="Logo" style={{ maxWidth: "180px" }} />
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
          Registro de Cliente
        </Typography>
      </Box>

      {fase === "inicio" && (
        <>
          <TextField
            label="Correo electrónico"
            name="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <TextField
            label="Confirmar contraseña"
            type="password"
            name="confirmPassword"
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={enviarDatosIniciales}
          >
            Enviar código
          </Button>
        </>
      )}

      {fase === "codigo" && (
        <>
          <Typography sx={{ mt: 2 }}>
            Ingresa el código que has recibido por correo:
          </Typography>
          <TextField
            label="Código de verificación"
            fullWidth
            margin="normal"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
            onClick={verificarCodigo}
          >
            Verificar y completar registro
          </Button>
        </>
      )}

      {fase === "completado" && (
        <>
          <Typography color="success.main" sx={{ mt: 2 }}>
            ✔ Registro exitoso
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/validacion")}
          >
            Ir al login
          </Button>
        </>
      )}

      {/* Mensajes */}
      {(mensaje || error) && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="body2"
            color={error ? "error" : "text.secondary"}
          >
            {error || mensaje}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default Registro;