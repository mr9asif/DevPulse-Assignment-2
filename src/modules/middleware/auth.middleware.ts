import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../util/jwt.js";


export const authenticate = (req:Request, res:Response, next:NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token as string);

    req.user= decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};