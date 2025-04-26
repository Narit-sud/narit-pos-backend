import { StoreInterface } from "./store.interface";
import { db } from "../../libs/db";
import { CustomError } from "../../class/CustomError";

export async function createService(newStore: StoreInterface): Promise<void> {
    const sql = `
        INSERT INTO 
        store (id, name, createdAt, updatedAt, createdBy, updatedBy)
        values ($1, $2, 'now()', 'now()', $3, 'now()'`;
    const { id, name, createdBy } = newStore;
    try {
        const result = await db.query(sql, [id || null, name, createdBy]);
        if (!result.rowCount) {
            throw new CustomError("Failed to create new store", 400);
        }
    } catch (error) {
        throw error;
    }
}
