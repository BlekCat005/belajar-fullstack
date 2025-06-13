import dotenv from "dotenv";
dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/";
const SECRET = process.env.SECRET || "";

export { PORT, MONGODB_URI, SECRET };
