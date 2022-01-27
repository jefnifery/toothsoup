const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socketio(server);

const PORT = process.env.PORT || 8000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

//Whenever someone connects this gets executed
io.on("connection", (socket) => {
    console.log("A user connected");

    //Whenever someone disconnects this piece of code executed
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
