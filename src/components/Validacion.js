import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext.js';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// preview-start
const providers = [{ id: 'credentials', name: 'Email and Password' }];
// preview-end


export default function Validacion() {
  const theme = useTheme();
  const {setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  const signIn = async (provider, formData) => {
    //const promise = new Promise((resolve) => {
      //setTimeout(() => {
        fetch('http://localhost:3001/login',{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              email: formData.get('email'), 
              password: formData.get('password')})
          })
          .then((response) => response.json())
          .then((data) => {
            alert(JSON.stringify(data));
            const token = data.token || null;
            if (token){
              localStorage.setItem("token",token);
              setAuth(token);
              navigate('/compra');
  
            }
            else {alert("Token no devuelto por el servidor")}
          });
       // resolve();
     // }, 300);
  //  });
  //  return promise;
  };
  
  return (
    // preview-start
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
      />
    </AppProvider>
    // preview-end
  );
}

