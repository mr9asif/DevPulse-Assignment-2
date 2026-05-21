import type { Request, Response } from "express";
import { authService } from "./auth.service.js";

class AuthController{

     signup =async(req:Request, res:Response)=>{
         try {
      const result = await authService.signupUser(req.body);

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      });
    }

    }

    login=async(req:Request ,res:Response)=>{
         try {
      const result = await authService.loginUser(req.body);
      // console.log(result)

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      });
    }
  };
    }


export const authController = new AuthController();