import React, { useState, useEffect } from "react";
import { Button, Box, Flex, PageHeader, Text } from "gestalt";

function Players({ socket }) {
    const [players, setPlayers] = useState(["player 1", "player 2"]);

    useEffect(() => {
        socket.on("playerUpdate", (players) => {
            console.log(players);
            setPlayers(players);
        });
    });

    return (
        <Box>
            {players.map((player) => {
                return <Box>{player}</Box>;
            })}
        </Box>
    );
}

export default Players;
