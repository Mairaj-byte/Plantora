import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Add Product
const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            bestseller,
        } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestseller: bestseller === "true",
            image: imagesUrl,
            date: Date.now(),
        };

        

        const product = new productModel(productData);
        await product.save();

        res.json({
            success: true,
            message: "Product Added",
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};


// List Products (excluding Services)
const listProducts = async (req, res) => {
    try {
        // Query to find products where subCategory is NOT "Services"
        const products = await productModel.find({ subCategory: { $ne: "Services" } });
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

// List Services
const servicesControl = async (req, res) => {
    try {
        // Query database to find only products where subCategory is 'Services'
        // Using 'i' for case-insensitive matching
        const products = await productModel.find({ 
            subCategory: { $regex: '^Services$', $options: 'i' } 
        });

        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};



// Remove Product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Product Removed",
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};





// Fetch Single Product
const singleProduct = async (req, res) => {
    try {
        // Backend handles both body and query fallback gracefully
        const productId = req.body.productId || req.query.productId;

        if (!productId) {
            return res.json({ success: false, message: "Product ID is required" });
        }

        const product = await productModel.findById(productId);

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({
            success: true,
            product,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const {
            id,
            name,
            description,
            price,
            category,
            subCategory,
            bestseller,
            sizes,
            existingImages // Passed from frontend as a JSON array string
        } = req.body;

        // Find the existing item first
        const currentProduct = await productModel.findById(id);
        if (!currentProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        // Parse existing images array or fall back to current database structure
        let updatedImages = existingImages ? JSON.parse(existingImages) : [...currentProduct.image];

        // Process potential image file injections matching your multi-upload configuration slots
        const imageSlots = ['image1', 'image2', 'image3', 'image4'];
        
        for (let i = 0; i < imageSlots.length; i++) {
            const slotName = imageSlots[i];
            if (req.files && req.files[slotName] && req.files[slotName][0]) {
                const file = req.files[slotName][0];
                const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: "image",
                });
                // Replace the specific index slot or push new url
                updatedImages[i] = result.secure_url;
            }
        }

        // Filter null values if any slot was skipped out of bound completely
        updatedImages = updatedImages.filter(Boolean);

        // Build the update payload matching schema types
        const updateData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestseller: bestseller === "true" || bestseller === true,
            sizes: sizes ? JSON.parse(sizes) : [],
            image: updatedImages
        };

        await productModel.findByIdAndUpdate(id, updateData);

        res.json({
            success: true,
            message: "Product Updated Successfully",
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

export {
    addProduct,
    listProducts,
    removeProduct,
    singleProduct,
    updateProduct,
    servicesControl,
};




