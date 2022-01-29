import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import MainPage from "./components/MainPage";
import Room from "./components/Room";

import "gestalt/dist/gestalt.css";
import "./App.css";

function App() {
    const [socket, setSocket] = useState(null);
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:8000`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    return (
        <div className="App">
            {socket ? (
                roomId ? (
                    <Room socket={socket} roomId={roomId} setRoomId={setRoomId} />
                ) : (
                    <MainPage socket={socket} setRoomId={setRoomId} username={username} setUsername={setUsername} />
                )
            ) : (
                <div>Connecting...</div>
            )}
        </div>
    );
}

export default App;
