import { Router } from "express";
import { getAllHandle, registerHandle } from "./handles";
import { UserInterface } from "./interface";

export const userRouter = Router();
userRouter.get("/", getAllHandle); // .user
userRouter.post("/register", registerHandle); // ./user/resgister
