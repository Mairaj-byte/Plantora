import express from 'express';
import upload from '../middleware/multer.js';
import authUser from '../middleware/authUser.js';
import { loginUser, registerUser, adminLogin, getUserData, setUserProfile } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

// Protected routes using authUser middleware
userRouter.post('/profilesetup', authUser, upload.single("image"), setUserProfile)
userRouter.get('/getuserdata', authUser, getUserData)

export default userRouter;