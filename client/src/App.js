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
        const newSocket = io(`http://${window.location.hostname}:8000`, { autoConnect: false });
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    const joinRoom = (joinRoomId, joinUsername) => {
        socket.auth = { username: joinUsername };
        socket.connect();

        if (!joinRoomId) {
            joinRoomId = Math.random().toString(36).slice(2, 8);
        }

        socket.emit("joinRoom", { roomId: joinRoomId, username });
        setRoomId(joinRoomId);
        setInRoom(true);
    };

    const leaveRoom = (leaveRoomId) => {
        socket.emit("leaveRoom", { roomId: leaveRoomId, username });
        setRoomId("");
        setInRoom(false);
        socket.disconnect();
    };

    return (
        <Box height="100vh" width="100vw">
            {socket ? (
                inRoom ? (
                    <Room socket={socket} username={username} roomId={roomId} leaveRoom={leaveRoom} />
                ) : (
                    <MainPage
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
