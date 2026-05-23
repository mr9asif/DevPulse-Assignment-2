import { verifyToken } from "../../util/jwt.js";
export const verifyJWT = (req, res, next) => {
    try {
        const token = req.header("token");
        console.log("TOKEN:", token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token required",
            });
        }
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};
