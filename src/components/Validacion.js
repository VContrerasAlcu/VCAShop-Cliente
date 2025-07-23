import React, { useContext } from "react";
import { Box, TextField, Button, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ClienteContext } from "../context/ClienteContext.js";
import { CarroContext } from "../context/CarroContext.js";
import { SocketContext } from "../context/WebSocketContext.js";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom"; 

export default function Validacion() {
  const { setCliente } = useContext(ClienteContext);
  const { setCarro } = useContext(CarroContext);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("Credenciales inválidas.");
        return;
      }

      const data = await res.json();
      const cliente = data.cliente;

      if (cliente?.token) {
        sessionStorage.setItem("cliente", JSON.stringify(cliente));
        setCliente(cliente);
        socket.emit("registro", cliente.email);

        const resCarro = await fetch("http://localhost:3001/carros/cargar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cliente),
        });

        const carroData = await resCarro.json();
        sessionStorage.setItem("carro", JSON.stringify(carroData));
        setCarro(carroData);

        navigate("/");
      } else {
        alert("Cliente no autorizado.");
      }
    } catch (err) {
      console.error("Error en login:", err);
      alert("Error de conexión con el servidor.");
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    fetch("http://localhost:3001/clientes/login-google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ googleData: decoded }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || "Error desconocido");
          }
          return data;
        })
        .then(async (data) => {
          const clienteGoogle = data.cliente;
          if (clienteGoogle) {
            if (clienteGoogle?.token) {
              sessionStorage.setItem("cliente", JSON.stringify(clienteGoogle));
              setCliente(clienteGoogle);
              socket.emit("registro", clienteGoogle.email);

              const resCarro = await fetch("http://localhost:3001/carros/cargar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clienteGoogle),
              });

              const carroData = await resCarro.json();
              sessionStorage.setItem("carro", JSON.stringify(carroData));
              setCarro(carroData);

              navigate("/");
            } else {
              alert("Cliente no autorizado.");
            }

          } else {
            alert("Cliente no recibido del servidor.");
          }
        })
        .catch((err) => {
          console.error("Error al iniciar sesión con Google:", err);
          alert(err.message);
        });
  }

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
        textAlign: "center",
      }}
    >
      <img src="/images/logo.png" alt="Logo" style={{ maxWidth: 180 }} />

      <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
        Hola!!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Identifícate para continuar.
      </Typography>

      <form onSubmit={handleSubmitLogin}>
        <TextField
          name="email"
          label="Correo electrónico"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="password"
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="info"
          fullWidth
          sx={{ my: 2 }}
        >
          Entrar
        </Button>
      </form>

      <Typography variant="body2" sx={{ mt: 2 }}>
        — o accede con tu cuenta Google —
      </Typography>
      <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("Error en el login con Google")}
        />
      </Box>

      <Typography variant="body2" sx={{ mt: 3 }}>
        ¿Olvidaste la contraseña?{" "}
        <Link
          to="/recuperar"
          style={{ textDecoration: "none", color: "#d32f2f", fontWeight: "bold" }}
        >
          Recupérala
        </Link>
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        ¿Eres nuevo/a?{" "}
        <Link
          to="/registro"
          style={{ textDecoration: "none", color: "#1e88e5", fontWeight: "bold" }}
        >
          Regístrate
        </Link>
      </Typography>
    </Box>
  );
}