import { createContext, useEffect, useState } from "react";


export const CarroContext = createContext();

export function CarroProvider({children}){
    const [carro,setCarro] = useState([]);

    useEffect(() => {
        const carro = sessionStorage.getItem("carro");
        setCarro(carro ? JSON.parse(carro) : []);

    }, []);
    return (
        <CarroContext.Provider value = {{carro, setCarro}} >
            {children}
        </CarroContext.Provider>
    )

}
