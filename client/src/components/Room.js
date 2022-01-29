import React, { useState, useEffect } from "react";

function Room({ socket, roomId, setRoomId }) {
    return <div className="Room">{roomId}</div>;
}

export default Room;
