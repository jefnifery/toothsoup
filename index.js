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

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });

    socket.on("joinRoom", (roomId) => {
        console.log(`A user joined room ${roomId}`);
        socket.join(roomId);
    });

    socket.on("leaveRoom", (roomId) => {
        console.log(`A user left room ${roomId}`);
        socket.leave(roomId);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
