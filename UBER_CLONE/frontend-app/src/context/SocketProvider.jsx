
import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

console.log("Connecting to:", import.meta.env.VITE_BASE_URL);

const socket = io(`${import.meta.env.VITE_BASE_URL}`); 


console.log("socket", socket);

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic 
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }, []);


    const sendMessage = (event, data) => {
        socket.emit(event, data);
    }

    const receiveMessage = (event, callback) => {
        socket.on(event, callback);
    }   



    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;