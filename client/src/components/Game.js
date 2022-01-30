import React, { useState, useEffect } from "react";
import Players from "./Players";
import Chat from "./Chat";
import GameOverlay from "./StartGameOverlay";
import GameHeader from "./GameHeader";

import { Box, Flex, Divider, FixedZIndex, CompositeZIndex } from "gestalt";

function Game({ socket, username, roomId, leaveRoom }) {
    const [gameState, setGameState] = useState({});
    const gameInProgress = gameState.progress === "IN_PROGRESS";

    // ------------------- Z-Index ------------------- //
    const GAME_OVERLAY_ZINDEX = new FixedZIndex(10);
    const GAME_HEADER_ZINDEX = new CompositeZIndex([GAME_OVERLAY_ZINDEX]);

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
                <GameHeader socket={socket} roomId={roomId} leaveRoom={leaveRoom} zindex={GAME_HEADER_ZINDEX} />
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
                <GameOverlay socket={socket} roomId={roomId} onStartGame={onStartGame} zindex={GAME_OVERLAY_ZINDEX} />
            )}
        </Box>
    );
}

export default Game;
