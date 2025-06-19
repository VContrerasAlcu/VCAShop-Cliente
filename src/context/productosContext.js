import { createContext, useState } from "react";

export const productosContext = createContext();
export function ProductosProvider({children}){
    const [productos, setProductos] = useState([]);
    return (
        <productosContext.Provider value={{productos,setProductos}}>
            {children}
        </productosContext.Provider>
    )
}