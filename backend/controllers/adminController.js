import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import adminModel from '../models/adminModel.js';
import transporter from '../config/nodeMailer.js';

/**
 * Admin Login Authentication
 */
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }

    try {
        // Find admin user
        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin account not found'
            });
        }

        // Compare entered plain text password with hashed password in database
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid administrative credentials'
            });
        }

        // Generate JSON Web Token (JWT)
        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: 'admin' },
            process.env.JWT_SECRET || 'fallback_secret_key',
            { expiresIn: '1d' } // Token expires in 24 hours
        );

        return res.json({
            success: true,
            message: 'Admin Authentication Successful',
            token
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error during authentication',
            error: error.message
        });
    }
};

/**
 * Transmit Password Reset OTP 
 */
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email is required'
        });
    }

    try {
        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin account not found'
            });
        }

        // Generate 6-digit OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        // Save OTP + expiry (15 mins)
        admin.resetOtp = otp;
        admin.resetOtpExpiryAt = Date.now() + 15 * 60 * 1000;

        await admin.save();

        // Send email
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: admin.email,
            subject: 'Admin Password Reset OTP',
            text: `Hi ${admin.name || 'Admin'},

Your password reset OTP is: ${otp}

This OTP is valid for 15 minutes.

Best regards,  
CollabZoneX Team`
        });

        return res.json({
            success: true,
            message: 'OTP sent to your admin email'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Validate OTP & Reset Password
 */
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({
            success: false,
            message: 'Email, OTP, and new password are required'
        });
    }

    try {
        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin account not found'
            });
        }

        // Validate OTP
        if (!admin.resetOtp || admin.resetOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        if (admin.resetOtpExpiryAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: 'OTP Expired'
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update Admin fields
        admin.password = hashedPassword;
        admin.resetOtp = '';
        admin.resetOtpExpiryAt = 0;

        await admin.save();

        // Send confirmation email
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Admin Password Reset Successful',
            text: `Hi ${admin.name || 'Admin'},

Your admin account password has been reset successfully for email: ${email}

Best regards,  
CollabZoneX Team`
        });

        return res.json({
            success: true,
            message: 'Admin password reset successfully'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error resetting admin password',
            error: error.message
        });
    }
};