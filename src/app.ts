import express from "express";
import authRouter from './modules/auth/auth.routes.js';
import issueRouter from './modules/issues/issues.router.js';


const app =express();

app.use(express.json());

app.use('/api/auth', authRouter)
app.use('/api', issueRouter)



export default app;