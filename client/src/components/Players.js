import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Divider, Text } from "gestalt";

function Players({ socket, username }) {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const playersUpdateListener = ({ players }) => {
            setPlayers(players);
        };

        socket.on("playersUpdate", playersUpdateListener);

        return () => {
            socket.off("playersUpdate", playersUpdateListener);
        };
    });

    return (
        <Box height={256} minHeight={256} padding={4}>
            <Flex direction="column" height="100%">
                <Heading size="sm">players</Heading>
                <Divider />
                <Box flex="grow" overflow="scrollY" marginTop={2}>
                    {players.map((player) => {
                        const name = player.playerName;
                        const isYou = name == username;
                        return (
                            <Text>
                                {name} {isYou ? "(you)" : ""}
                            </Text>
                        );
                    })}
                </Box>
            </Flex>
        </Box>
    );
}

export default Players;
