import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    image: { type: String, default: "" },      // Profile Photo URL
    phone: { type: String, default: "" },      // Mobile Number
    dob: { type: String, default: "" },        // Date of Birth
    gender: { type: String, default: "" },     // Gender
    address: { type: Object, default: { line1: "", line2: "", city: "", state: "", pincode: "" } } // Address object
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;