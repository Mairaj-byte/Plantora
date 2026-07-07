import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetOtp: { type: String, default: '' },
    resetOtpExpiryAt: { type: Number, default: 0 }
}, { minimize: false });

const adminModel = mongoose.models.admin || mongoose.model('admin', adminSchema);

/**
 * Automatically seeds the permanent master admin account if it does not exist.
 * This is called right after your MongoDB connection initializes.
 */
export const initializeAdmin = async () => {
    try {
        const permanentEmail = "xboi480@gmail.com";
        const adminExists = await adminModel.findOne({ email: permanentEmail });

        if (!adminExists) {
            // Hash the initial password '12345678' safely before inserting
            const hashedPassword = await bcrypt.hash("12345678", 10);
            
            const masterAdmin = new adminModel({
                name: "Eco Garden Nursery",
                email: permanentEmail,
                password: hashedPassword,
                resetOtp: '',
                resetOtpExpiryAt: 0
            });

            await masterAdmin.save();
            console.log("🌱 Permanent Master Admin account created successfully.");
        } else {
            console.log("✓ Master Admin account already verified.");
        }
    } catch (error) {
        console.error("❌ Error initializing permanent admin account:", error.message);
    }
};

export default adminModel;