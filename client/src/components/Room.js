import React, { useState, useEffect } from "react";
import Players from "./Players";
import Chat from "./Chat";
import { Button, Box, Flex, PageHeader, Divider } from "gestalt";

function Room({ socket, username, roomId, leaveRoom }) {
    return (
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
                    <Chat socket={socket} username={username} roomId={roomId} />
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Room;
