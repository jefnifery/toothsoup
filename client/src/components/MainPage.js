import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Switch, TextField, Text, Heading, Divider } from "gestalt";

function MainPage({ roomId, username, joinRoom, setRoomId, setUsername }) {
    const [joinExistingRoom, setJoinExistingRoom] = useState(false);

    const canJoinRoom = username && ((joinExistingRoom && roomId) || !joinExistingRoom);

    return (
        <Box padding={4}>
            <Flex alignItems="center" direction="column" gap={4}>
                <Heading>toothsoup</Heading>
                <Divider />
                <Flex gap={2}>
                    <Text>create new room</Text>
                    <Switch onChange={({ value }) => setJoinExistingRoom(value)} switched={joinExistingRoom} />
                    <Text>join existing room</Text>
                </Flex>
                <TextField label="enter a username" onChange={({ value }) => setUsername(value)} value={username} />
                {joinExistingRoom && (
                    <TextField label="enter room id" onChange={({ value }) => setRoomId(value)} value={roomId} />
                )}
                <Button text="join room" onClick={() => joinRoom(roomId, username)} disabled={!canJoinRoom} />
            </Flex>
        </Box>
    );
}

export default MainPage;
