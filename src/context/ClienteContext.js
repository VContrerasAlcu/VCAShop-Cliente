import { createContext, useState, useEffect } from "react";

export const ClienteContext = createContext(null);

export function ClienteProvider({ children }) {
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        const cliente = sessionStorage.getItem("cliente");
        setCliente(cliente ? cliente : null);
    }, []);

    return (
        <ClienteContext.Provider value={{ cliente, setCliente }}>
            {children}
        </ClienteContext.Provider>
    );
}