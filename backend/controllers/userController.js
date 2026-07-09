import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Invalid credentials' })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Fetch single user's details
const getUserData = async (req, res) => {
    try {
        // Grab the userId directly from the request object (injected by authUser middleware)
        const userId = req.userId; 

        if (!userId) {
            return res.json({ success: false, message: "User identity missing from request" });
        }

        const user = await userModel.findById(userId).select("-password");
        
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Unified Controller for Profile Setup & Profile Updates
const setUserProfile = async (req, res) => {
    try {
        const { name, phone, dob, gender, address } = req.body;
        const userId = req.userId; // Grab from req directly
        const imageFile = req.file;

        if (!name) {
            return res.json({ success: false, message: "Name is required" });
        }

        // 1. Build base update dataset
        const updateData = {
            name,
            phone: phone || "",
            dob: dob || "",
            gender: gender || "",
        };

        // 2. Safely parse address whether it arrives stringified or as an object
        if (address) {
            updateData.address = typeof address === 'string' ? JSON.parse(address) : address;
        }

        // 3. File selection upload option handling
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            updateData.image = imageUpload.secure_url; // Assigns the generated Cloudinary URL
        }

        // 4. Update or Setup in a single atomic database query
        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

        if (!updatedUser) {
            return res.json({ success: false, message: "User profile could not be found" });
        }

        res.json({ 
            success: true, 
            message: "Profile configured and updated successfully", 
            user: updatedUser 
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { loginUser, registerUser, adminLogin, getUserData, setUserProfile }