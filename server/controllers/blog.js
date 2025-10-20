import Blog from "../models/Blog.js";

const postBlogs = async(req, res) => {
    const { title, content, author, category, image } = req.body;

    if (!title || !content || !author || !category) {
        return res.status(400).json({ success : false, message: "Missing required fields" });
}

const newBlog = new Blog({
    title,
    content,
    author,
    category,
    image
});
const savedBlog = await newBlog.save();
res.status(201).json({ success: true, message : "Blog created successfully", blog: savedBlog });
};

export { postBlogs };
