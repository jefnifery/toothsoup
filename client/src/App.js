import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import MainPage from "./components/MainPage";
import Room from "./components/Room";
import { Box } from "gestalt";

import "gestalt/dist/gestalt.css";
import "./App.css";

function App() {
    const [socket, setSocket] = useState(null);
    const [inRoom, setInRoom] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:8000`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    const joinRoom = (joinRoomId) => {
        if (!joinRoomId) {
            joinRoomId = Math.random().toString(36).slice(2, 8);
        }

        socket.emit("joinRoom", joinRoomId);
        setRoomId(joinRoomId);
        setInRoom(true);
    };

    const leaveRoom = (leaveRoomId) => {
        socket.emit("leaveRoom", leaveRoomId);
        setRoomId("");
        setInRoom(false);
    };

    return (
        <Box paddingX={4} paddingY={4}>
            {socket ? (
                inRoom ? (
                    <Room socket={socket} username={username} roomId={roomId} leaveRoom={leaveRoom} />
                ) : (
                    <MainPage
                        socket={socket}
                        roomId={roomId}
                        username={username}
                        joinRoom={joinRoom}
                        setRoomId={setRoomId}
                        setUsername={setUsername}
                    />
                )
            ) : (
                <div>Connecting...</div>
            )}
        </Box>
    );
}

export default App;
