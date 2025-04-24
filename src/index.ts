import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import { db } from "./libs/db";

const app = express();
const port = process.env.PORT || 3000;
// const corsOptions = {
//   origin: process.env.CORS_ORIGIN || "*",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://192.168.1.64:5173",
            "http://localhost:3000",
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use(router);

app.listen(port, async () => {
    const result = await db.query("SELECT NOW()");
    console.log(`Server is running on port ${port}`);
    console.log("Database connected at: ", result.rows[0].now);
});
