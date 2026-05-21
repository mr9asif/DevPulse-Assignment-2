import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import type { JWTpayload } from '../types/type.js';

export const generateToken = (payload:JWTpayload)=>{
    return jwt.sign(payload,config.secret_key as string, {expiresIn:"3d"})
}

export const verifyToken = (token:string) => {

  return jwt.verify(token, config.secret_key as string) as JWTpayload;
};

export const  mid=(req:Request, res:Response, next:NextFunction)=>{
    console.log("hearders",req.headers.token);
    next();
}