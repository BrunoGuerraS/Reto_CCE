import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (
    error: unknown,
    _request: Request,
    response: Response,
    _next: NextFunction
) => {
    const statusCode = 500;
    const message = error instanceof Error ? error.message : "Unexpected error";
    response.status(statusCode).json({ error: message });
}
