import express from 'express';
import {
  createBlog,
  getAllBlogs,
  deleteBlog,
  editBlog,
  getbyid,
} from '../controllers/blogController.js';
import { authlogin } from '../controllers/logincontroller.js';

const router = express.Router();

router.post('/', createBlog);
router.get('/', getAllBlogs);
router.put('/update', editBlog);
router.post('/delete', deleteBlog);
router.post('/get',getbyid);





export default router;
