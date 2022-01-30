const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const roomRoutes = require("./routes/roomRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.set("socketio", io);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/room", roomRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    socket.username = username;
    next();
});

io.on("connection", (socket) => {
    let currentRoomId = ""; // only really used for unintention disconnect

    const emitPlayersUpdate = (roomId) => {
        const playersInRoom = io.sockets.adapter.rooms.get(roomId);
        const players = [];
        for (let [id, socket] of io.of("/").sockets) {
            const inRoom = playersInRoom && playersInRoom.has(id);
            if (inRoom) {
                players.push({
                    playerId: id,
                    playerName: socket.username,
                });
            }
        }

        io.to(roomId).emit("playersUpdate", { players });
    };

    socket.on("disconnect", () => {
        emitPlayersUpdate(currentRoomId);
    });

    socket.on("joinRoom", ({ roomId, username }) => {
        currentRoomId = roomId;
        socket.join(roomId);
        emitPlayersUpdate(roomId);
    });

    socket.on("leaveRoom", ({ roomId, username }) => {
        currentRoomId = "";
        emitPlayersUpdate(roomId);
        socket.leave(roomId);
    });

    socket.on("suggestWord", (event, data) => {
        return;
    });

    socket.onAny((event, data) => {
        console.log("------------------------------");
        console.log(event);
        console.log(data);
        console.log();
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
