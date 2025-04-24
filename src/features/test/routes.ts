import { Router } from "express";

export const testRouter = Router();

testRouter.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to the test API" });
});
