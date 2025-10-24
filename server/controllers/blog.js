import Blog from "../models/Blog.js";
import JsonWebToken from "jsonwebtoken";

const postBlogs = async(req, res) => {
    const { title, content, category, image } = req.body;
    const {authorization} = req.headers;
    console.log(authorization);

    let decodedToken;

    try {
      const decodedToken = JsonWebToken.verify(authorization.split(" ")[1], process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid or missing token" });
      
    }
    console.log(decodedToken);

    if (!title || !content || !category) {
        return res.status(400).json({ success : false, message: "Missing required fields" });
}



const newBlog = new Blog({
    title,
    content,
    author: decodedToken?.id,
    category,
    image,
    slug: `temp-slug-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
});

const savedBlog = await newBlog.save();
savedBlog.slug = `${title.toLowerCase().replace(/ /g, '-')}-${savedBlog._id}`.replace(/[^\w-]+/g, '');
await savedBlog.save();

res.status(201).json({ success: true, message : "Blog created successfully", blog: savedBlog });
};

const getBlogs = async (req, res) => {
    const blogs =  await Blog.find().populate('author', '_id name email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs, message: "All blogs fetched successfully" }); 
};

const getBlogsForSlug = async (req, res) => {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug }).populate('author', '_id name email');

    


    if (!blog) {
        return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog, message: "Blog fetched successfully" });
}

export { postBlogs, getBlogs, getBlogsForSlug };

const getBlogById = async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate('author', '_id name email');
    if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, data: blog, message: 'Blog fetched successfully' });
};

const updateBlogById = async (req, res) => {
    const { id } = req.params;
    const { title, content, category, image, userId } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // ownership check - ensure the requester is the author
    if (!userId || blog.author.toString() !== userId) {
        return res.status(403).json({ success: false, message: 'Forbidden: you are not the author of this blog' });
    }

    // update allowed fields
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (category) blog.category = category;
    if (image !== undefined) blog.image = image;

    await blog.save();
    res.status(200).json({ success: true, message: 'Blog updated successfully', data: blog });
};

export { getBlogById, updateBlogById };
