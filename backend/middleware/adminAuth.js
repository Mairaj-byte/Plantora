import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized, login again" });
        }

        // Decode the JWT token signed by loginAdmin
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // Ensure the role inside the payload matches 'admin'
        if (token_decode.role !== 'admin') {
            return res.status(401).json({ success: false, message: "Not Authorized, login again" });
        }

        // Pass down user parameters to subsequent controllers if needed
        req.adminId = token_decode.id;
        
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: "Not Authorized, login again" });
    }
};

export default adminAuth;