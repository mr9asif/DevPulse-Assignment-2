import dotenv from 'dotenv';
import path from 'node:path';
import { cwd, env } from "node:process";

dotenv.config({path:path.join(cwd(),".env")});

const config={
    port:env.PORT,
    database_url:env.DATABASE_URL,
    secret_key:env.JWT_KEY
}


export default config;