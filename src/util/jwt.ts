import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import type { JWTpayload } from '../types/type.js';

export const generateToken = (payload:JWTpayload)=>{
    return jwt.sign(payload,config.secret_key as string, {expiresIn:"3d"})
}

export const verifyToken = (token:string) => {
  return jwt.verify(token, config.secret_key as string) as JWTpayload;
};