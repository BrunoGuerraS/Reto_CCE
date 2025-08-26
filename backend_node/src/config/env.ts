import dotenv from "dotenv";
dotenv.config();
export const config = {
    port: Number(process.env.PORT ?? 3000),
    httpCorsOrigins: [
        "http://localhost:5173",
        "http://localhost:4000",
        "http://localhost:8080",
    ],
    staticDir: "/src/views",
};