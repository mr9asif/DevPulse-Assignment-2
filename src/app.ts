import express, { type Request, type Response } from "express";
import authRouter from './modules/auth/auth.routes.js';
import issueRouter from './modules/issues/issues.router.js';


const app =express();

app.use(express.json());

app.get('/', (req:Request,res:Response)=>{
    res.send("server working properly!")
})
app.use('/api/auth', authRouter)
app.use('/api', issueRouter)



export default app;