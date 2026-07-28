const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Store blogs in memory
const blogs = [];

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to My Blog API!");
});

// POST Route - Add a Blog
app.post("/blogs", (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: "Title and content are required."
        });
    }

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

// GET Route - View All Blogs
app.get("/blogs", (req, res) => {
    res.json(blogs);
});

// Start Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});