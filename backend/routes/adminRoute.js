import express from 'express';
import { sendResetOtp, resetPassword, loginAdmin } from '../controllers/adminController.js';

const adminRouter = express.Router();


adminRouter.post('/login', loginAdmin);
adminRouter.post('/send-reset-otp', sendResetOtp);
adminRouter.post('/reset-password', resetPassword);

export default adminRouter;