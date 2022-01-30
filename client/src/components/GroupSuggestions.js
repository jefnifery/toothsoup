import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, TextField, Button, Text } from "gestalt";

function WordSuggestion({ socket }) {
    const [groupSuggestions, setGroupSuggestions] = useState([]);

    useEffect(() => {
        socket.on("newGroupSuggestion", ({ word, username }) => {
            console.log("hehehe");
            const newGroupSuggestions = [...groupSuggestions, { word, username }];
            setGroupSuggestions(newGroupSuggestions);
        });
    });

    return (
        <Box flex="grow" paddingY={4}>
            {groupSuggestions.map((groupSuggestion) => {
                return <Text>{groupSuggestion.word}</Text>;
            })}
        </Box>
    );
}

export default WordSuggestion;
