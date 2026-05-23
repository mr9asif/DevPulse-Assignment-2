import jwt from 'jsonwebtoken';
import config from '../config/index.js';
export const generateToken = (payload) => {
    return jwt.sign(payload, config.secret_key, { expiresIn: "3d" });
};
export const verifyToken = (token) => {
    return jwt.verify(token, config.secret_key);
};
