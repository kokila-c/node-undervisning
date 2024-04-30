import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import { ReqError } from "../util/errorHandler.mjs";
import { loginUser } from "../util/dbQueries.mjs";

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = loginUser(email);
    if (!user) {
      next(new ReqError(403, "Authentication failed"));
      return;
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (correctPassword) {
      res.status(200).json({ message: "Authentication successful" });
    } else {
      next(new ReqError(403, "Wrong password"));
    }
  } catch (e) {
    next(new ReqError(500, e.message));
  }
});

router.all("/", (req, res) => {
  throw new ReqError(405, `${req.method} not supported on this endpoint.`);
});

export default router;
