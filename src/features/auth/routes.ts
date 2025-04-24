import { Router } from "express";
import { loginHandle } from "./handle";

/**
 *@description /auth/login use to login user and assign a token to the user
 */
export const authRouter = Router();

authRouter.post("/login", loginHandle); // ./auth/login
