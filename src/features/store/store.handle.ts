import { Response, Request } from "express";
import { createService } from "./store.service";
import { serviceErrorHandle } from "../../libs/serviceErrorHandle";

export async function createHandle(req: Request, res: Response): Promise<void> {
    const newStore = req.body;
    if (!newStore.createdBy) {
        res.status(400).send({ message: "CreatedBy is required" });
        return;
    }
    try {
        await createService(newStore);
        res.status(201).json({ message: "Store created successfully" });
    } catch (error) {
        serviceErrorHandle(res, error);
    }
}
