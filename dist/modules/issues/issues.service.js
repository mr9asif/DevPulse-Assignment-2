import { pool } from "../../db/db.js";
class IssueService {
    // create issue
    createIssue = async (payload) => {
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
    };
    // get all issues
    getAllIssues = async (sort = "newest", type, status) => {
        let query = `SELECT * FROM issues`;
        const values = [];
        const conditions = [];
        if (type) {
            values.push(type);
            conditions.push(`type = $${values.length}`);
        }
        if (status) {
            values.push(status);
            conditions.push(`status = $${values.length}`);
        }
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(" AND ")}`;
        }
        query +=
            sort === "oldest"
                ? ` ORDER BY created_at ASC`
                : ` ORDER BY created_at DESC`;
        const issuesResult = await pool.query(query, values);
        const issues = issuesResult.rows;
        if (issues.length === 0) {
            return [];
        }
        const reporterIds = [
            ...new Set(issues.map(issue => issue.reporter_id)),
        ];
        const reportersResult = await pool.query(`
    SELECT id, name, role
    FROM users
    WHERE id = ANY($1)
    `, [reporterIds]);
        const reporterMap = new Map(reportersResult.rows.map(user => [user.id, user]));
        return issues.map(issue => ({
            id: issue.id,
            title: issue.title,
            description: issue.description,
            type: issue.type,
            status: issue.status,
            reporter: reporterMap.get(issue.reporter_id),
            created_at: issue.created_at,
            updated_at: issue.updated_at,
        }));
    };
    // get single issue
    getSingleIssue = async (id) => {
        const issueResult = await pool.query(`
    SELECT *
    FROM issues
    WHERE id = $1
    `, [id]);
        const issue = issueResult.rows[0];
        if (!issue) {
            return null;
        }
        const reporterResult = await pool.query(`
    SELECT id, name, role
    FROM users
    WHERE id = $1
    `, [issue.reporter_id]);
        const reporter = reporterResult.rows[0];
        return {
            id: issue.id,
            title: issue.title,
            description: issue.description,
            type: issue.type,
            status: issue.status,
            reporter,
            created_at: issue.created_at,
            updated_at: issue.updated_at,
        };
    };
    // update issue
    getIssueById = async (id) => {
        const result = await pool.query(`
      SELECT *
      FROM issues
      WHERE id = $1
      `, [id]);
        return result.rows[0];
    };
    updateIssue = async (id, payload) => {
        const { title, description, type, status } = payload;
        const result = await pool.query(`
      UPDATE issues
     SET
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      type = COALESCE($3, type),
      status = COALESCE($4, status),
      updated_at = NOW()
    WHERE id = $5
    RETURNING *;
      `, [title, description, type, status, id]);
        return result.rows[0];
    };
    //   delete
    deleteIssue = async (id) => {
        const result = await pool.query(`
    DELETE FROM issues
    WHERE id = $1
    RETURNING *;
    `, [id]);
        return result.rows[0];
    };
}
export const issueService = new IssueService;
