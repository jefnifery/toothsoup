import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, TextField, Button, Text } from "gestalt";

function WordSuggestion({ socket, gameState }) {
    return (
        <Box flex="grow" paddingY={4}>
            {gameState.suggestions.map(({ word, username }) => {
                return <Text>{word}</Text>;
            })}
        </Box>
    );
}

export default WordSuggestion;
