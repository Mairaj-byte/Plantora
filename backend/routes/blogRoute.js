import express from 'express';
import { addBlog, listBlogs, removeBlog, singleBlog, updateBlog } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const blogRouter = express.Router();

// Match your API route layout precisely
blogRouter.post('/addblog', adminAuth, upload.fields([{ name: 'image', maxCount: 1 }]), addBlog);
blogRouter.post('/remove', adminAuth, removeBlog);
blogRouter.get('/single/:id', singleBlog);
blogRouter.get('/list', listBlogs);
blogRouter.post('/editblog', adminAuth, upload.fields([{ name: 'image', maxCount: 1 }]), updateBlog);

export default blogRouter;