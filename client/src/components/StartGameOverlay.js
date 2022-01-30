import React from "react";
import { Button, Box, Layer } from "gestalt";

function GameOverlay({ socket, roomId, onStartGame, zindex }) {
    return (
        <Layer zindex={zindex}>
            <Box
                color="gray"
                opacity={0.7}
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="fixed"
                top
                bottom
                left
                right
            >
                <Button text="start game" size="lg" color="blue" onClick={() => onStartGame(roomId)} />
            </Box>
        </Layer>
    );
}

export default GameOverlay;
