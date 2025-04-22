import { Router } from "express";
import { userRouter } from "./features/user/routes";

export const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API" });
});
router.use("/user", userRouter);
