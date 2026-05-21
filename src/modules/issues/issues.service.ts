
import { pool } from "../../db/db.js";
import type { CreateIssuePayload } from "../../types/type.js";


class IssueService{

    // create issue
    createIssue=async(payload:CreateIssuePayload)=>{
      const { title, description, type, reporter_id } = payload;
       const query = `
    INSERT INTO issues (
      title,
      description,
      type,
      reporter_id
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [
    title,
    description,
    type,
    reporter_id,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
    }
}

export const issueService = new IssueService;