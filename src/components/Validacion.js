import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { ClienteContext } from '../context/ClienteContext.js';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { CarroContext } from '../context/CarroContext.js';
import Carro from '../classes/Carro.js';
import { SocketContext } from '../context/WebSocketContext.js';



const providers = [{ id: 'credentials', name: 'Email and Password' }];



export default function Validacion() {
  const theme = useTheme();
  let token = null;
  let cliente = null;
  const {setCliente} = useContext(ClienteContext);
  const {setCarro} = useContext(CarroContext);
  const {socket, setSocket} = useContext(SocketContext);
  const navigate = useNavigate();
  const signIn = async (provider, formData) => {
        fetch('http://localhost:3001/login',{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              email: formData.get('email'), 
              password: formData.get('password')})
          })
          .then((response) => response.json())
          .then((data) => {            
            cliente = data.cliente;
            token = cliente.token;
        });
        if (token){
            sessionStorage.setItem("cliente",cliente);
            setCliente(cliente);
            socket.on('connect', () => {
              socket.emit('registro', cliente.email);
            });
            try {
              const response = await fetch('http://localhost:3001/carros/cargar',{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(cliente)
              });
              if (!response.ok) console.log ('Error en la petición de carro.');
              else{
                const data = await response.json();
                const carro = new Carro(data, socket, cliente);
                sessionStorage.setItem("carro", carro);
                setCarro(carro);
                                  
              }

            }
            catch(err){
              console.log('Error al conectar con el servidor')
            }

          navigate("/");

        }
        else {alert("Cliente no autorizado por el servidor")};
        }
        
  function Title() {
    return <h2 style={{ marginBottom: 8 }}>Hola!!</h2>;
  }
  
  function Subtitle() {
    return (
      <Typography>
        Identifícate para continuar.
      </Typography>
    );
  }

  function Remember(){
    return (<></>)
  }

  function CustomButton() {
    return (
      <Button
        type="submit"
        variant= "contained"
        color="info"
        size="small"
        disableElevation
        fullWidth
        sx={{ my: 2 }}
      >;
        Entrar
      </Button>
    );
  }

  function SignUpLink() {
    return (
      <Link to="/registro" variant="body2">
        Eres nuevo/a? Regístrate
      </Link>
    );
  }

  function ForgotPasswordLink() {
    return (
      <Link to="/recuperar" style={{ textDecoration: "none", color: "#d32f2f", fontWeight: "bold", marginTop: 16 }}>
        ¿Olvidaste la contraseña? Recupérala
      </Link>
    );
  }
  

  const BRANDING = {
    logo: (
      <img
        src="/images/logo.png"
        alt="logo"
        style={{ height: 200}}

      />
    )
  };

  return (
 
    <AppProvider  branding={BRANDING} theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: false },
          form: { noValidate: true },
          rememberMe: null,
          submitButton: {children: "Entrar"},
          footer: { 
            children: (
              <span>¿Eres nuevo/a? <Link to="/alta" style={{ textDecoration: "none", color: "#1e88e5", fontWeight: "bold" }}>Regístrate</Link></span>
            )
          }
      
         }}
         slots={{
          title: Title,
          subtitle: Subtitle,
          rememberMe: Remember,
          submitButton: CustomButton,
          signUpLink: SignUpLink,
          forgotPasswordLink: ForgotPasswordLink,
        }}
        
      />
    </AppProvider>

  );
}

