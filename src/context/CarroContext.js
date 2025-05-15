import { createContext, useEffect, useState } from "react";


export const CarroContext = createContext();

export function CarroProvider({children}){
    const [carro,setCarro] = useState(null);

    useEffect(() => {
        const carro = sessionStorage.getItem("carro");
        setCarro(carro ? carro : null);

    }, []);
    return (
        <CarroContext.Provider value = {{carro, setCarro}} >
            {children}
        </CarroContext.Provider>
    )

}
