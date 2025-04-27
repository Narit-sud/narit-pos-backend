import { Router } from "express";
import { getAllHandle } from "./handles";
import { UserInterface } from "../auth/auth.interface";

export const userRouter = Router();
userRouter.get("/", getAllHandle); // .user
