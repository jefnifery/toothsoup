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

module.exports = router;
