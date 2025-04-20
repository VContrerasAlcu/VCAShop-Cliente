import { createContext, useState } from "react";

export const productoContext = createContext();
export function ProductoProvider({children}){
    const [productoEnContext, setProducto] = useState(null);
    return (
        <productoContext.Provider value={{productoEnContext,setProducto}}>
            {children}
        </productoContext.Provider>
    )
}