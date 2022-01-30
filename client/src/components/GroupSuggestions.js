import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, TextField, Button, Text } from "gestalt";

function WordSuggestion({ socket, groupSuggestions, setGroupSuggestions }) {
    return (
        <Box flex="grow" marginTop={4} marginBottom={4} color="blue">
            {groupSuggestions.map((groupSuggestion) => {
                return <Text>{groupSuggestion.word}</Text>;
            })}
        </Box>
    );
}

export default WordSuggestion;
