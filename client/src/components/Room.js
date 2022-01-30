import React, { useState, useEffect } from "react";
import Players from "./Players";
import Chat from "./Chat";
import { Button, Box, Flex, PageHeader, Divider, Layer } from "gestalt";

function Room({ socket, username, roomId, leaveRoom }) {
    const [gameState, setGameState] = useState({});
    const gameInProgress = gameState.progress === "IN_PROGRESS";

    useEffect(() => {
        const gameUpdateListener = (gameState) => {
            setGameState(gameState);
        };

        socket.on("gameUpdate", gameUpdateListener);

        return () => {
            socket.off("gameUpdate", gameUpdateListener);
        };
    });

    const onStartGame = (startGameRoomId) => {
        socket.emit("startNewGame", { roomId: startGameRoomId });
    };

    return (
        <Box height="100%">
            <Flex direction="column" flex="grow" height="100%">
                <Box padding={4}>
                    <PageHeader
                        title={"toothsoup"}
                        subtext={`room: ${roomId}`}
                        primaryAction={<Button text="leave room" onClick={() => leaveRoom()} />}
                    />
                </Box>
                <Divider />
                <Flex flex="grow" width="100%">
                    <Box flex="grow" height="100%" padding={4}>
                        Game Board
                    </Box>
                    <Divider />
                    <Flex direction="column" height="100%" width={384}>
                        <Players socket={socket} username={username} />
                        <Divider />
                        <Chat socket={socket} gameState={gameState} username={username} roomId={roomId} />
                    </Flex>
                </Flex>
            </Flex>
            {!gameInProgress && (
                <Layer>
                    <Box color="blue" opacity={0.3} position="fixed" top bottom left right>
                        <Button text="start game" onClick={() => onStartGame(roomId)} />
                    </Box>
                </Layer>
            )}
        </Box>
    );
}

export default Room;
