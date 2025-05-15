import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";


export const SocketContext = createContext();

export function SocketProvider({children}){
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const webSocket = io('http://localhost:3001');
        setSocket(webSocket);
        
    },[]);
    

    return(
        <SocketContext.Provider value = {{socket,setSocket}}>
            {children}
        </SocketContext.Provider>
    )
}
