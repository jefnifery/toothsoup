import React, { useState, useEffect } from "react";
import { Box, Flex, TextField, Button, Text } from "gestalt";

function WordSuggestion({ socket, gameState }) {
    return (
        <Box flex="grow" overflow="scrollY" paddingY={4}>
            {(gameState.suggestions || []).map(({ word, username }) => {
                return <Text>{word}</Text>;
            })}
        </Box>
    );
}

export default WordSuggestion;
