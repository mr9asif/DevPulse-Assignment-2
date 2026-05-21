import type { Request, Response } from "express";
import { issueService } from "./issues.service.js";


class IssueController{
    create=async(req:Request, res:Response)=>{
       try {
    const reporter_id = req.user.id;

    const { title, description, type } = req.body;
    

    if (!title || !description || !type) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await issueService.createIssue({
      title,
      description,
      type,
      reporter_id,
    });

    return res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }

    }
}

export const issueController = new IssueController;