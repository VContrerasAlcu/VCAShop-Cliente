import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";


export const SocketContext = createContext();

export function SocketProvider({children}){
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const webSocket = io('http://localhost:3001');
        webSocket.on('connect',() => {
            console.log('cliente enviado connect');
        });
        webSocket.on('disconnect', () => {
            console.log('cliente desconectado');
        })
        setSocket(webSocket);
        return () => {
            webSocket.disconnect();
        }
        
    },[]);
    

    return(
        <SocketContext.Provider value = {{socket,setSocket}}>
            {children}
        </SocketContext.Provider>
    )
}
