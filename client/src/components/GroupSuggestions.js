import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, TextField, Button, Text } from "gestalt";

function WordSuggestion({ socket, gameState }) {
    return (
        <Box flex="grow" paddingY={4}>
            {gameState.wordQueue.map((word) => {
                return <Text>{word}</Text>;
            })}
        </Box>
    );
}

export default WordSuggestion;
