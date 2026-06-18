import { Response, NextFunction } from "express";
import { prisma } from "../services/db";

export const authenticate = async (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header provided" });
    }
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    let decodedStr: string;
    try {
      decodedStr = Buffer.from(token, "base64").toString("utf-8");
    } catch (err) {
      return res.status(401).json({ error: "Invalid token encoding" });
    }

    const parts = decodedStr.split(".");
    if (parts.length !== 3) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    let payload: { email: string; exp: number };
    try {
      payload = JSON.parse(parts[1]);
    } catch (err) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    if (!payload.email) {
      return res.status(401).json({ error: "Token does not contain user email" });
    }

    if (Date.now() > payload.exp) {
      return res.status(401).json({ error: "Token has expired" });
    }

    let user = await prisma.user.findUnique({
      where: { email: payload.email.toLowerCase() }
    });

    if (!user) {
      // Auto-create user since auth is client-side mocked.
      const email = payload.email.toLowerCase();
      const name = email.split("@")[0];
      const id = "usr_" + Math.random().toString(36).substr(2, 9);
      user = await prisma.user.create({
        data: {
          id,
          email,
          name: name.charAt(0).toUpperCase() + name.slice(1)
        }
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ error: "Authentication failed" });
  }
};
