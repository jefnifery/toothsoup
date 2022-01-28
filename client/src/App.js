import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Test from "./components/Test";

import "./App.css";

function App() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:8000`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    return (
        <div className="App">
            <header className="app-header">React Chat</header>
            {socket ? (
                <div className="chat-container">
                    <Test socket={socket} />
                </div>
            ) : (
                <div>Connecting...</div>
            )}
        </div>
    );
}

export default App;
