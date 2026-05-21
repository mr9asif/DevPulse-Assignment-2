
import bcrypt from 'bcrypt';
import { pool } from "../../db/db.js";
import type { signupPayload } from "../../types/type.js";
import { generateToken } from '../../util/jwt.js';

class AuthService{
    // signup
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

// login
 loginUser=async(payload:{
  email: string;
  password: string;
})=>{
    const {email, password}=payload;
    if(!email || !password){
      throw new Error("All fields are required");
    }

     // Find user
  const result = await pool.query(
    `
      SELECT * FROM users
      WHERE email = $1
    `,
    [email]
  );
 console.log("email:", email)
        const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid email or password");
  }
 // Compare password
  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );
   if (!isPasswordMatched) {
    throw new Error("Invalid email or password");
  }
  // JWT Payload
  const payloadData = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
    // Create Token
  const token = generateToken(payloadData);
    return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };


 }



}

 
export const authService = new AuthService();