import { Router } from "express";
import { loginHandle, registerHandle } from "./auth.handle";

/**
 *@description /auth/login use to login user and assign a token to the user
 *@description /auth/register use to register user and assign a token to the user
 */
export const authRouter = Router();

authRouter.post("/login", loginHandle); // ./auth/login
authRouter.post("/register", registerHandle); // ./auth/register
