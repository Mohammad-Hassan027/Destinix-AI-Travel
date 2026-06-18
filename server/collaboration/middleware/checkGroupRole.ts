import { Response, NextFunction } from "express";

export const checkGroupRole = (allowedRoles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const role = req.membership?.role;
    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({
        error: `Access denied. Insufficient permissions. Requires one of: ${allowedRoles.join(", ")}.`
      });
    }
    next();
  };
};
