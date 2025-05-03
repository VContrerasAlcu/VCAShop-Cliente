import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Validaciones from "../classes/Validaciones.js";
import { useNavigate } from "react-router-dom";
import Temporizador from "./Temporizador.js";

let mailCorrecto = false;
let passCorrecto = false;

async function enviarDatos(email, password, setError, setStatus, setMensaje, setFormDisabled) {
  try {
    const response = await fetch("http://localhost:3001/clientes/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setStatus(response.status);
    if (!response.ok) {
      setError(data.error);
    } else {
      setError("");
      setMensaje(data.mensaje);
      setFormDisabled(true);
    }
  } catch (err) {
    setError("Ha habido un problema al conectar con el servidor");
  }
}

async function verificarCliente(email, setVerificado) {
  try {
    const response = await fetch(`http://localhost:3001/clientes/verificar?email=${email}`, {
      method: "GET",
    });
    const data = await response.json();
    if (data.verificado) {
      setVerificado(true);
    }
  } catch (err) {
    console.error("Error al verificar el cliente:", err);
  }
}

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const [formDisabled, setFormDisabled] = useState(false);
  const [expired, setExpired] = useState(false); // Estado para el tiempo expirado
  const [verificado, setVerificado] = useState(false); // Nuevo estado para la verificación
  const mensajeTemp = 'Pulse en el link que se le ha enviado al correo para completar el registro';

  const resetStates = () => {
    setFormDisabled(false); // Rehabilitar el formulario
    setExpired(false); // Reiniciar el estado de expiración
    setStatus(""); // Reiniciar el estado
    setMensaje(""); // Reiniciar el mensaje
    setVerificado(false); // Reiniciar la verificación
  };

  // Polling para verificar el estado del cliente
  useEffect(() => {
    if (status === 200 && !verificado && formData.email) {
      const interval = setInterval(() => {
        verificarCliente(formData.email, setVerificado);
      }, 5000); // Consulta cada 5 segundos

      // Limpia el intervalo cuando el cliente esté verificado o se desmonte el componente
      return () => clearInterval(interval);
    }
  }, [status, verificado, formData.email]);

  let mensajePantalla = (
    <div>
      <Typography variant="body2" color="error" sx={{ mt: 2 }}>
        {error}
      </Typography>
    </div>
  );

  if (status === 401) {
    mensajePantalla = (
      <div>
        {mensajePantalla}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate("/validacion")}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  if (status === 200) {
    mensajePantalla = (
      <div>
        {mensajePantalla}
        <div>
          {verificado ? (
            <div>
              <Typography 
                variant="body2" 
                color="success" 
                sx={{ 
                  mt: 2, 
                  mb: 2 
                }}
              >
                Cliente verificado. Vaya a la página de login.
              </Typography>

              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  width: '100px', // Ajusta el tamaño del botón
                  height: '30px', // Opcional: cambia la altura si lo deseas
                  display: 'block', // Para centrarlo horizontalmente
                  margin: '0 auto', // Centrar el botón en su contenedor
                }}
                onClick={() => navigate(-1)}
              >
                Login
              </Button>
            </div>
          ) : !expired ? (
            <Temporizador
              days={0}
              hours={0}
              minutes={5}
              seconds={0}
              onComplete={() => {
                setExpired(true); // Activar estado de expiración
                setFormDisabled(false); // Rehabilitar el formulario
                setMensaje("El tiempo ha expirado. Por favor, vuelva a intentarlo.");
              }}
              mensaje={mensajeTemp}
            />
          ) : (
            <Typography variant="body1" color="error" sx={{ mt: 2 }}>
              El tiempo ha expirado. Por favor, vuelva a intentarlo.
            </Typography>
          )}
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlurMail = (e) => {
    const mail = e.target.value;
    const validarMail = Validaciones.validarEmail(mail);
    if (validarMail !== true) {
      alert(validarMail);
      mailCorrecto = false;
      return;
    } else mailCorrecto = true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mailCorrecto && passCorrecto) {
      resetStates(); // Reiniciar el estado antes de enviar los nuevos datos
      enviarDatos(formData.email, formData.password, setError, setStatus, setMensaje, setFormDisabled);
    } else alert("Por favor, rellene los campos correctamente");
  };

  const handleBlurConfirm = (e) => {
    if (e.target.value !== formData.password) {
      alert("La confirmación de la contraseña no coincide con la contraseña");
      passCorrecto = false;
      return;
    } else passCorrecto = true;
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 8,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <img src="/images/logo.png" alt="Logo Empresa" style={{ maxWidth: "200px" }} />
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "#1976d2",
            fontFamily: "Roboto, sans-serif",
            mt: 2,
          }}
        >
          Alta nuevo cliente
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: "#6c757d",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "0.5px",
            mt: 1,
          }}
        >
          Rápido, sencillo y seguro.
        </Typography>
      </Box>
      <Typography>{mensajePantalla}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Correo electrónico"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlurMail}
          required
          disabled={formDisabled}
        />
        <TextField
          name="password"
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={formDisabled}
        />
        <TextField
          name="confirmPassword"
          label="Confirmar contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.confirmPassword}
          onBlur={handleBlurConfirm}
          onChange={handleChange}
          required
          disabled={formDisabled}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={formDisabled}
          sx={{ mt: 3 }}
        >
          Registrarse
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;