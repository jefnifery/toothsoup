import React, { useState, useEffect } from "react";
import Players from "./Players";
import { Button, Box, Flex, PageHeader, Text } from "gestalt";

function Room({ socket, username, roomId, leaveRoom }) {
    const [test, setTest] = useState("");

    useEffect(() => {
        socket.on("details", (details) => {
            console.log(details);
            setTest(details);
        });
    });

    return (
        <Flex direction="column" flex="grow">
            <PageHeader
                title={`toothsoup - ${username}`}
                subtext={`room: ${roomId}`}
                primaryAction={
                    <Box>
                        <Button text="leave room" onClick={() => leaveRoom(roomId)} />
                    </Box>
                }
            />
            <Flex width="100%">
                <Box flex="grow" color="blue">
                    Game Board
                </Box>
                <Flex direction="column" width={256}>
                    <Players socket={socket} />
                    <Box>Chat</Box>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Room;
