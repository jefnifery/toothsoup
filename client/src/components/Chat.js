import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, Heading, Divider, Text, TextField, Button } from "gestalt";
import WordSuggestion from "./WordSuggestion";
import GroupSuggestion from "./GroupSuggestions";

function Chat({ socket, username, roomId }) {
    const [yourWord, setYourWord] = useState("");
    const [groupSuggestions, setGroupSuggestions] = useState([]);

    useEffect(() => {
        socket.on("newGroupSuggestion", ({ word, username }) => {
            const newGroupSuggestions = [...groupSuggestions, { word, username }];
            setGroupSuggestions(newGroupSuggestions);
        });
    });

    const onSuggestWord = (word) => {
        console.log("suggesting...");
        setYourWord("");
        socket.emit("suggestWord", { roomId, username, word });
    };

    return (
        <Box flex="grow" padding={4}>
            <Flex direction="column" height="100%">
                <Heading size="sm">suggestions</Heading>
                <Divider />
                <GroupSuggestion
                    socket={socket}
                    groupSuggestions={groupSuggestions}
                    setGroupSuggestions={setGroupSuggestions}
                />
                <Divider />
                <WordSuggestion
                    socket={socket}
                    yourWord={yourWord}
                    setYourWord={setYourWord}
                    onSuggestWord={onSuggestWord}
                />
            </Flex>
        </Box>
    );
}

export default Chat;
