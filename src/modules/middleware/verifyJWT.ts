import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../util/jwt.js";


export const verifyJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}