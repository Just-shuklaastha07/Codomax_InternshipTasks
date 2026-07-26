const express = require("express");

const app = express();

app.use(express.json());

// GET Route
app.get("/", (req, res) => {
    res.send("Welcome to my Express Server!");
});

// POST Route
app.post("/submit", (req, res) => {
    const data = req.body;

    res.send({
        message: "Data received successfully!",
        receivedData: data
    });
});

// Start Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});