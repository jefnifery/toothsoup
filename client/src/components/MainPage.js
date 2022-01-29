import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Text, TextField } from "gestalt";

function MainPage({ socket, setRoomId, username, setUsername }) {
    return (
        <Box paddingX={4} paddingY={4}>
            <Flex alignItems="center" direction="column" gap={4}>
                <TextField label="enter a username" onChange={({ value }) => setUsername(value)} value={username} />
                <Button text="join room" onClick={() => setRoomId("tempId")} />
            </Flex>
        </Box>
    );
}

export default MainPage;
