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

// PUT Route - Edit Blog
app.put("/blogs/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const { title, content } = req.body;

    const blog = blogs.find(blog => blog.id === id);

    if (!blog) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    blog.title = title;
    blog.content = content;

    res.json({
        message: "Blog updated successfully!",
        blog
    });

});

// Start Server
const PORT = 3000;


// DELETE Route - Delete Blog
app.delete("/blogs/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = blogs.findIndex(blog => blog.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    blogs.splice(index, 1);

    res.json({
        message: "Blog deleted successfully!"
    });

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});