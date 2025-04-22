import { Router } from "express";
import { getAllHandle } from "./handle";
import { UserInterface } from "./interface";

export const userRouter = Router();
userRouter.get("/", getAllHandle);
// userRoouter.post("/register",
