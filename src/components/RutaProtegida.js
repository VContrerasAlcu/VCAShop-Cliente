import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ClienteContext } from "../context/ClienteContext.js";

function RutaProtegida({ children }) {
    const { cliente } = useContext(ClienteContext);

    return cliente ? children : <Navigate to="/validacion" />;
}

export default RutaProtegida;