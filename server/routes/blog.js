import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { uploadMiddleware } from '../config/cloudinary.js';
import {
  postBlogs,
  getBlogs,
  getBlogForSlug,
  patchPublishBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blog.js';

const router = express.Router();

// Public routes
router.get('/blogs', getBlogs);
router.get('/blogs/:slug', getBlogForSlug);

// Protected routes
router.post('/blogs', authenticate, uploadMiddleware, postBlogs);
router.patch('/blogs/:slug/publish', authenticate, patchPublishBlog);
router.put('/blogs/:slug', authenticate, uploadMiddleware, updateBlog);
router.delete('/blogs/:slug', authenticate, deleteBlog);

export default router;