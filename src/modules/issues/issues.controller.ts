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

    // get all
    getAll = async (req: Request, res: Response) => {
  try {
    const { sort, type, status } = req.query;

    const result = await issueService.getAllIssues(
      sort as string,
      type as string,
      status as string
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get sinle issue
getSingleIssue = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid issue id",
      });
    }

    const result = await issueService.getSingleIssue(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// update 
    updateIssue = async (req: Request, res: Response) => {
    try {
      const issueId = Number(req.params.id);

      if (isNaN(issueId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid issue id",
        });
      }

      const { title, description, type } = req.body;

      const user = req.user;

      const issue = await issueService.getIssueById(issueId);

      if (!issue) {
        return res.status(404).json({
          success: false,
          message: "Issue not found",
        });
      }

      // Contributor rules
      if (user.role === "contributor") {

        // Must own the issue
        if (issue.reporter_id !== user.id) {
          return res.status(403).json({
            success: false,
            message: "You can update only your own issues",
          });
        }

        // Issue must be open
        if (issue.status !== "open") {
          return res.status(403).json({
            success: false,
            message: "Only open issues can be updated",
          });
        }
      }

      // Maintainer automatically passes

      const result = await issueService.updateIssue(
        issueId,
        title,
        description,
        type
      );

      return res.status(200).json({
        success: true,
        message: "Issue updated successfully",
        data: result,
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

}

export const issueController = new IssueController;