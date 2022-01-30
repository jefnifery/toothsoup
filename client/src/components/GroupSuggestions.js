import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, TextField, Button, Text } from "gestalt";

function WordSuggestion({ socket }) {
    const [groupSuggestions, setGroupSuggestions] = useState([]);

    useEffect(() => {
        const newGroupSuggestionListener = ({ word, username }) => {
            const newGroupSuggestions = [...groupSuggestions, { word, username }];
            setGroupSuggestions(newGroupSuggestions);
        };

        socket.on("newGroupSuggestion", newGroupSuggestionListener);

        return () => {
            socket.off("newGroupSuggestion", newGroupSuggestionListener);
        };
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
