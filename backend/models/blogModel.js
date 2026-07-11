import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: String, // Stored as a string to match your '12 July 2024' format
        required: true
    },
    author: {
        type: String,
        required: true
    },
    readTime: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true
    },
    paragraph: {
        type: String,
        required: true
    }
}, { timestamps: true });

const blogModel =
    mongoose.models.blog || mongoose.model("blog", blogSchema);

export default blogModel;