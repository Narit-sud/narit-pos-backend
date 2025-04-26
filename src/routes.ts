import { Router } from "express";
import { userRouter } from "./features/user/routes";
import { authRouter } from "./features/auth/routes";
import { testRouter } from "./features/test/routes";
import { storeRouter } from "./features/store/store.routes";

export const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API" });
});
router.use("/user", userRouter); // ./user
router.use("/auth", authRouter); // ./auth
router.use("/test", testRouter); // ./test
router.use("/store", storeRouter); // ./store
