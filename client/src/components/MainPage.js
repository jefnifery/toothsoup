import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, Button, Switch, TextField, Text, Heading, Divider } from "gestalt";

function MainPage({ roomId, username, joinRoom, setRoomId, setUsername }) {
    const usernameTextField = useRef(null);
    const [joinExistingRoom, setJoinExistingRoom] = useState(false);

    useEffect(() => {
        usernameTextField.current.focus();
    });

    const canJoinRoom = username && ((joinExistingRoom && roomId) || !joinExistingRoom);

    const onEnterKey = ({ event }) => {
        if (event.code == "Enter") {
            if (canJoinRoom) {
                joinRoom(roomId, username);
            }
        }
    };

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
                <TextField
                    label="enter a username"
                    onChange={({ value }) => setUsername(value)}
                    onKeyDown={onEnterKey}
                    value={username}
                    ref={usernameTextField}
                />
                {joinExistingRoom && (
                    <TextField
                        label="enter room id"
                        onChange={({ value }) => setRoomId(value)}
                        onKeyDown={onEnterKey}
                        value={roomId}
                    />
                )}
                <Button text="join room" onClick={() => joinRoom(roomId, username)} disabled={!canJoinRoom} />
            </Flex>
        </Box>
    );
}

export default MainPage;
