const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");

// Create a new blog post
// routes POST /api/blogs
const createBlog = asyncHandler(async (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const newBlog = await Blog.create({
        title,
        content,
        author,
    });

    if (newBlog) {
        res.status(201).json({ message: "Blog post created", blog: newBlog });
    } else {
        res.status(400);
        throw new Error("Failed to create blog post");
    }
});

// Get all blog posts
// routes GET /api/blogs
const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
});

// Get a single blog post by ID
// routes GET /api/blogs/:id
const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        res.status(200).json(blog);
    } else {
        res.status(404);
        throw new Error("Blog not found");
    }
});

// Update a blog post by ID
// routes PUT /api/blogs/:id
const updateBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (blog) {
        res.status(200).json({ message: "Blog updated", blog });
    } else {
        res.status(404);
        throw new Error("Blog not found");
    }
});

// Delete a blog post by ID
// routes DELETE /api/blogs/:id
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (blog) {
        res.status(200).json({ message: "Blog deleted", blog });
    } else {
        res.status(404);
        throw new Error("Blog not found");
    }
});

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
