import React from "react";
import { Button, Box, PageHeader } from "gestalt";

function GameOverlay({ socket, roomId, leaveRoom, zindex }) {
    return (
        <Box color="white" paddingX={2} paddingY={4} zIndex={zindex}>
            <PageHeader
                title={"toothsoup"}
                subtext={`room: ${roomId}`}
                primaryAction={<Button text="leave room" onClick={() => leaveRoom()} />}
            />
        </Box>
    );
}

export default GameOverlay;
