
import bcrypt from 'bcrypt';
import { pool } from "../../db/db.js";
import type { signupPayload } from "../../types/type.js";

class AuthService{
 signupUser=async (payload:signupPayload)=>{
   
    const {name, email, password, role } =payload

    if(!name || !email || !password || !role){
        throw new Error("All fields are required");
    }

     const userExist = await pool.query(`
         SELECT * FROM users WHERE email=$1 
        `,[email])

          if (userExist.rows.length > 0) {
    throw new Error("Email already exists");
  }

  const hashedPassword =await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users (
      name,
      email,
      password,
      role
    )
    VALUES ($1,$2,$3,$4)
    RETURNING id,name,email,role,created_at,updated_at
    `,
    [name, email, hashedPassword, role]
  );

  return result.rows[0];
};


}

 
export const authService = new AuthService();