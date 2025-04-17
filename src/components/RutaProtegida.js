import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function RutaProtegida({ children }) {
    const { auth } = useContext(AuthContext);

    return auth ? children : <Navigate to="/validacion" />;
}

export default RutaProtegida;