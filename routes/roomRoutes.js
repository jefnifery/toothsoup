const { Router } = require("express");

const router = Router();

router.get("/healthcheck", (req, res) => {
    return res.json({
        status: 200,
    });
});

router.get("/version", (req, res) => {
    return res.json({
        status: 200,
        version: "v1.0.0",
    });
});

router.get("/:roomId/test", (req, res) => {
    const io = req.app.get("socketio");
    const roomId = req.params.roomId;

    console.log(`Sending details to ${roomId}`);
    io.to(roomId).emit("details", "hi details");

    return res.json({
        status: 200,
    });
});

module.exports = router;
