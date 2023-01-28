import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4000;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://prueba:prueba@cluster0.noyz2br.mongodb.net/Proyecto1";