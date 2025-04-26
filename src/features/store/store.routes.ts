import { Router } from "express";
import { createHandle } from "./store.handle";

export const storeRouter = Router();

storeRouter.post("/", createHandle);
