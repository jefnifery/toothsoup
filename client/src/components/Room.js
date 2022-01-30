import React, { useState, useEffect } from "react";
import Players from "./Players";
import { Button, Box, Flex, PageHeader, Divider } from "gestalt";

function Room({ socket, username, roomId, leaveRoom }) {
    const [test, setTest] = useState("");

    useEffect(() => {
        socket.on("details", (details) => {
            console.log(details);
            setTest(details);
        });
    });

    return (
        <Flex direction="column" flex="grow" height="100%">
            <Box padding={4}>
                <PageHeader
                    title={`toothsoup - ${username}`}
                    subtext={`room: ${roomId}`}
                    primaryAction={<Button text="leave room" onClick={() => leaveRoom(roomId)} />}
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
                    <Box padding={4}>Chat</Box>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Room;
