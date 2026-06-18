import { Response, NextFunction } from "express";

export const validateBody = (requiredFields: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const missing: string[] = [];
    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === "") {
        missing.push(field);
      }
    }
    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(", ")}` });
    }
    next();
  };
};

export const validateParams = (requiredParams: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const missing: string[] = [];
    for (const param of requiredParams) {
      if (req.params[param] === undefined || req.params[param] === null || req.params[param] === "") {
        missing.push(param);
      }
    }
    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing path parameters: ${missing.join(", ")}` });
    }
    next();
  };
};
