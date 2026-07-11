import { v2 as cloudinary } from "cloudinary";
import blogModel from "../models/blogModel.js";

// Add Blog
const addBlog = async (req, res) => {
    try {
        const {
            category,
            date,
            author,
            readTime,
            title,
            summary,
            paragraph
        } = req.body;

        // Extract targeted single file matching your route configuration fields
        const imageFile = req.files && req.files.image && req.files.image[0];
        let imageUrl = "";

        if (imageFile) {
            const result = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image",
            });
            imageUrl = result.secure_url;
        }

        const blogData = {
            category,
            image: imageUrl,
            date,
            author,
            readTime,
            title,
            summary,
            paragraph
        };

        const blog = new blogModel(blogData);
        await blog.save();

        res.json({
            success: true,
            message: "Blog Added Successfully",
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

// List Blogs
const listBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({});
        res.json({ success: true, blogs });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

// Remove Blog
const removeBlog = async (req, res) => {
    try {
        // Accepts identification via payload key 'id' matching your product workflow
        await blogModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Blog Removed",
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

// Fetch Single Blog
const singleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Update Blog
const updateBlog = async (req, res) => {
    try {
        const {
            id,
            category,
            date,
            author,
            readTime,
            title,
            summary,
            paragraph
        } = req.body;

        const currentBlog = await blogModel.findById(id);
        if (!currentBlog) {
            return res.json({ success: false, message: "Blog not found" });
        }

        // Maintain old image URL if no new file object is targeted
        let updatedImageUrl = currentBlog.image;

        const imageFile = req.files && req.files.image && req.files.image[0];
        if (imageFile) {
            const result = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image",
            });
            updatedImageUrl = result.secure_url;
        }

        const updateData = {
            category,
            image: updatedImageUrl,
            date,
            author,
            readTime,
            title,
            summary,
            paragraph
        };

        await blogModel.findByIdAndUpdate(id, updateData);

        res.json({
            success: true,
            message: "Blog Updated Successfully",
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

export {
    addBlog,
    listBlogs,
    removeBlog,
    singleBlog,
    updateBlog
};