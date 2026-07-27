const express = require("express");

const app = express();

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to my Blog API!");
});

// POST Route
const blogs = [];

app.post("/blogs", (req, res) => {
    const { title, content } = req.body;

    const blog = {
        id: blogs.length + 1,
        title,
        content
    };

    blogs.push(blog);

    res.status(201).json({
        message: "Blog added successfully!",
        blog
    });
});

// GET Route
app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// Start Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});