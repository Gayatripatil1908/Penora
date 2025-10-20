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
    image,
    slug: `temp-slug-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
});

const savedBlog = await newBlog.save();
savedBlog.slug = `${title.toLowerCase().replace(/ /g, '-')}-${savedBlog._id}`.replace(/[^\w-]+/g, '');
await savedBlog.save();

res.status(201).json({ success: true, message : "Blog created successfully", blog: savedBlog });
};

export { postBlogs };
