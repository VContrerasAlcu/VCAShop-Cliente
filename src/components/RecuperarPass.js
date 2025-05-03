import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Validaciones from "../classes/Validaciones.js";
import { useNavigate } from "react-router-dom";
import Temporizador from "./Temporizador.js";
import {io} from "socket.io-client";

let mailCorrecto = false;
let passCorrecto = false;



async function enviarDatos(email, setError, setStatusBuscaCliente, setMensaje, setEmailDisabled, setBotonVerificarDisabled, setToken, setEsperandoVerficacion) {
  try {
    const response = await fetch("http://localhost:3001/clientes/recuperar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    setStatusBuscaCliente(response.status);
    if (!response.ok) {
      setError(data.error);
      setEmailDisabled(false);
      setBotonVerificarDisabled(false);
    } else {
      setError("");
      setToken(data.token);
      setMensaje(data.mensaje);
      setStatusBuscaCliente(response.status);
      setEsperandoVerficacion(true);
    }
  } catch (err) {
    console.error('Error al conectar con el servidor: ', err);
  }
}

async function cambiarContraseña(email, nuevaPass, token, setStatusNuevaPass, setError, setMensaje){
  
  try {
        const response = await fetch("http://localhost:3001/clientes/cambiarPass", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, nuevaPass }),
        });
        const data = await response.json();
        setStatusNuevaPass(response.status);
        if (response.status!==200) {
          setError(data.error);
        } else {
          setError("");
          setMensaje(data.mensaje);
        }
    } catch (err) {
        console.error('Error al conectar con el servidor: ', err);
    }
};


const RegisterForm = () => {
 
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [statusBuscaCliente, setStatusBuscaCliente] = useState("");
  const [statusNuevaPass, setStatusNuevaPass] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [email,setEmail] = useState("");
  const [errorToken,setErrorToken] = useState(false);
  const navigate = useNavigate();
  const [esperandoVerificacion, setEsperandoVerficacion] = 'false';
  const [formDisabled, setFormDisabled] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [passDisabled, setPassDisabled] = useState(true);
  const [passConfDisabled,setPassConfDisabled] = useState(true);
  const [botonDisabled, setBotonDisabled] = useState(true);
  const [botonVerificarDisabled, setBotonVerificarDisabled] = useState(false);
  const [botonCambiarDisabled, setBotonCambiarDisabled] = useState(false);
  const [expired, setExpired] = useState(false); // Estado para el tiempo expirado
  const [verificado, setVerificado] = useState(false); // Nuevo estado para la verificación
  const [token, setToken] = useState("");
  const mensajeTemp = 'Pulsa en el link que se ha enviado al correo para verificar tu identidad';

  
  const socket = io("http://localhost:3001");
  const resetStates = () => {
    setFormDisabled(false); // Rehabilitar el formulario
    setExpired(false); // Reiniciar el estado de expiración
    setStatusBuscaCliente(""); // Reiniciar el estado
    setMensaje(""); // Reiniciar el mensaje
    setVerificado(false); // Reiniciar la verificación
    setToken("");
  };

  // Websocket para verificar el estado del cliente
  useEffect(() => {
    if (!verificado && !expired && statusBuscaCliente===200){ 
      socket.on('connect', () => {
        socket.emit('registro',formData.email);
      });  
      socket.on('linked',(data) => {
        setVerificado(data.verificado);
        if (data.verificado){
          setToken(data.token);
          setPassDisabled(false);
          setPassConfDisabled(false);
        }
        else {
          setErrorToken(true);
          setError(data.error);
        }
        
      });
    }
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [statusBuscaCliente, verificado, expired]);

  let mensajePantalla = (
    <div>
      <Typography variant="body2" color="error" sx={{ mt: 2 }}>
        {error}
      </Typography>
    </div>
  );
  if (statusBuscaCliente === 400) {
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
            onClick={() => navigate('/registro')}
          >
            Registro
          </Button>
        </div>
      </div>
    );
  };

  if (statusBuscaCliente === 200) {
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
                Cliente verificado. Cambie la contraseña.
              </Typography>
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
                setEmailDisabled(false);
                setPassDisabled(true);
                setBotonVerificarDisabled(false);
                setBotonCambiarDisabled(false);
                setMensaje("El tiempo ha expirado. Por favor, vuelve a intentarlo.");
              }}
              mensaje={mensajeTemp}
            />
          ) : (
            <Typography variant="body1" color="error" sx={{ mt: 2 }}>
              El tiempo ha expirado. Por favor, vuelve a intentarlo.
            </Typography>
          )}
        </div>
      </div>
    );
  };
  if (statusNuevaPass === 200) {
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
          {mensaje}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate('/validacion')}
          >
            Login
          </Button>
        </div>
      </div>
    );
  };
  if (statusNuevaPass === 400) {
    mensajePantalla = (
      <Typography variant="body1" color="error" sx={{ mt: 2 }}>
        {error}
      </Typography>
    )
  };

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
    if (!verificado){
        if (mailCorrecto){
            setBotonVerificarDisabled(true);
            setEmailDisabled(true);
            setExpired(false);
            enviarDatos(formData.email, setError, setStatusBuscaCliente, setMensaje, setEmailDisabled, setBotonVerificarDisabled, setToken, setEsperandoVerficacion);
        }
        else alert("Por favor, rellene el campo email correctamente");
    }
    else{
        if (passCorrecto){
            setMensaje("");
            setEmailDisabled(true);
            setPassDisabled(true);
            setPassConfDisabled(true);
            setBotonCambiarDisabled(true);
            setStatusBuscaCliente("");
            cambiarContraseña(formData.email,formData.password, token, setStatusNuevaPass, setMensaje, setError, setStatusBuscaCliente);
        }
        else alert("Por favor, rellene los campos correctamente");
    }
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
          Recuperación de contraseña
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
          disabled={emailDisabled}
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
          disabled={passDisabled}
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
          disabled={passConfDisabled}
        />
        <div>
            {!verificado ? 
                (<Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={botonVerificarDisabled}
                    sx={{ mt: 3 }}
                    >
                    Verificar
                </Button>)
                :
                (
                <Button
                  type="submit"
                  variant="contained"
                  color="success" // Corrige el typo de 'sucess' a 'success'
                  fullWidth
                  disabled={botonCambiarDisabled}
                  sx={{
                      mt: 3,
                      backgroundColor: "#4caf50", // Verde moderno
                      color: "#fff", // Letras blancas
                      fontFamily: "Roboto, sans-serif", // Letras modernas
                      fontWeight: "bold", // Letras en negrita
                      '&:hover': {
                          backgroundColor: "#388e3c", // Verde más oscuro al pasar el mouse
                      },
                  }}
                >
                  Cambiar contraseña
                </Button>
                )
            }
        </div>
      </form>
    </Box>
  );
};

export default RegisterForm;