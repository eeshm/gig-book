import type { Request, Response, NextFunction } from "express";

export const errorHandler = (_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(_err.stack);
  if (_err.name === "ValidationError") {
    return res.status(400).json({ error: _err.message });
  }
  res.status(500).json({ message: _err.message || "Internal Server Error" });
};
