import Blog from '../models/blog.js';

// Create Blog
export const createBlog = async (req, res) => {
  try {
    const { blogName, author, content } = req.body;

    if (!blogName || !author || !content) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const blog = new Blog({ blogName, author, content });
    await blog.save();

    res.status(201).json({ message: '✅ Blog created successfully', blog });
  } catch (error) {
    console.error("❌ Error creating blog:", error);
    res.status(500).json({ message: "❌ Failed to create blog", error: error.message });
  }
};

// Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ blogs, total: blogs.length });
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to fetch blogs', error: error.message });
  }
};

//getbyid

export const getbyid = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Successfully retrieved", data: blog });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving blog", error: error.message });
  }
};

// Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: '❌ Blog not found' });
    }

    res.status(200).json({ message: '✅ Blog deleted', deletedBlog });
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to delete blog', error: error.message });
  }
};

// Update Blog
export const editBlog = async (req, res) => {
  try {
   const { id, blogName, author, content } = req.body;


    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { blogName, author, content },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: '❌ Blog not found' });
    }

    res.status(200).json({ message: '✅ Blog updated', updatedBlog });
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to update blog', error: error.message });
  }
};
