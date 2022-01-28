import React, { useState, useEffect } from "react";

function Test({ socket }) {
    const [message, setMessage] = useState("starting message");

    useEffect(() => {
        const messageListener = (message) => {
            setMessage(message);
        };

        socket.on("message", messageListener);

        return () => {
            socket.off("message", messageListener);
        };
    }, [socket]);

    return <div>{message}</div>;
}

export default Test;
