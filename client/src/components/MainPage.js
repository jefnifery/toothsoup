import React, { useState, useEffect } from "react";
import { Flex, Button, Switch, TextField, Text, Heading } from "gestalt";

function MainPage({ socket, roomId, username, joinRoom, setRoomId, setUsername }) {
    const [joinExistingRoom, setJoinExistingRoom] = useState(false);

    const canJoinRoom = username && ((joinExistingRoom && roomId) || !joinExistingRoom);

    return (
        <Flex alignItems="center" direction="column" gap={4}>
            <Heading>toothsoup</Heading>
            <Flex gap={2}>
                <Text>create new room</Text>
                <Switch onChange={({ value }) => setJoinExistingRoom(value)} switched={joinExistingRoom} />
                <Text>join existing room</Text>
            </Flex>
            <TextField label="enter a username" onChange={({ value }) => setUsername(value)} value={username} />
            {joinExistingRoom && (
                <TextField label="enter room id" onChange={({ value }) => setRoomId(value)} value={roomId} />
            )}
            <Button text="join room" onClick={() => joinRoom(roomId)} disabled={!canJoinRoom} />
        </Flex>
    );
}

export default MainPage;
