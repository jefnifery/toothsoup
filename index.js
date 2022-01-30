const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { wsEngine: require("eiows").Server });

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.set("socketio", io);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

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

const rooms = {};

io.on("connection", (socket) => {
    // ------------- Globals -------------
    let currentRoomId = "";
    let currentUsername = "";

    // ------------- Room Stuff -------------

    const emitPlayersUpdate = (roomId) => {
        const players = rooms[roomId]?.players || [];
        io.to(roomId).emit("playersUpdate", { players });
    };

    const joinRoom = ({ roomId, username }) => {
        if (!rooms[roomId]) {
            rooms[roomId] = {
                players: [],
                gameState: {
                    wordQueue: [],
                },
            };
        }

        rooms[roomId].players.push({ playerId: socket.id, playerName: username });

        socket.join(roomId);
        emitPlayersUpdate(roomId);
    };

    const leaveRoom = ({ roomId, username }) => {
        if (rooms[roomId]) {
            const index = rooms[roomId].players.findIndex((player) => player.playerName === username);
            if (index !== -1) {
                rooms[roomId].players.splice(index, 1);
            }
            if (rooms[roomId].players.length === 0) {
                rooms[roomId] = undefined;
            }
        }

        socket.leave(roomId);
        emitPlayersUpdate(roomId);
    };

    socket.on("joinRoom", ({ roomId, username }) => {
        joinRoom({ roomId, username });
        emitGameState(roomId);

        currentRoomId = roomId;
        currentUsername = username;
    });

    socket.on("disconnect", () => {
        leaveRoom({ roomId: currentRoomId, username: currentUsername });

        currentRoomId = "";
        currentUsername = "";
    });

    socket.on("leaveRoom", () => {
        leaveRoom({ roomId: currentRoomId, username: currentUsername });

        currentRoomId = "";
        currentUsername = "";
    });

    // ------------- Game Stuff -------------

    const emitGameState = (roomId) => {
        const gameState = rooms[roomId].gameState;
        io.to(roomId).emit("gameUpdate", gameState);
    };

    socket.on("suggestWord", ({ roomId, username, word }) => {
        if (rooms[roomId]) {
            rooms[roomId].gameState.wordQueue.push(word);
        }

        emitGameState(roomId);
        // io.to(roomId).emit("newGroupSuggestion", { word, username });
    });

    // ------------- Other Stuff -------------

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
