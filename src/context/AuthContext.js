import { createContext, useState, useEffect } from "react";

export const ClienteContext = createContext();

export function AuthProvider({ children }) {
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        const cliente = sessionStorage.getItem("cliente");
        setCliente(cliente ? JSON.parse(cliente) : null);
    }, []);

    return (
        <ClienteContext.Provider value={{ cliente, setCliente }}>
            {children}
        </ClienteContext.Provider>
    );
}