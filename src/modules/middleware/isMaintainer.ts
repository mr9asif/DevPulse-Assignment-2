import type { NextFunction, Request, Response } from "express";

export const isMaintainer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "maintainer") {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }

  next();
};