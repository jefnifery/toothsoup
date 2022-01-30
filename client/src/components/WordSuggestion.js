import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, TextField, Button } from "gestalt";

function WordSuggestion({ socket, yourWord, setYourWord, onSuggestWord }) {
    const suggestionTextField = useRef(null);

    useEffect(() => {
        suggestionTextField.current.focus();
    }, []);

    const canSuggestWord = yourWord.length === 5 && /^[a-z]+$/i.test(yourWord);

    const onEnterKey = ({ event }) => {
        if (event.code == "Enter") {
            if (canSuggestWord) {
                onSuggestWord(yourWord);
            }
        }
    };

    return (
        <Box marginTop={4}>
            <Flex width="100%" justifyContent="between" gap={4}>
                <Box flex="grow">
                    <TextField
                        onChange={({ value }) => setYourWord(value)}
                        onKeyDown={onEnterKey}
                        value={yourWord}
                        ref={suggestionTextField}
                    />
                </Box>
                <Button
                    text="suggest"
                    onClick={() => onSuggestWord(yourWord)}
                    disabled={!canSuggestWord}
                    color={canSuggestWord ? "blue" : "gray"}
                />
            </Flex>
        </Box>
    );
}

export default WordSuggestion;
