import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/server-common/config";
import { createUserSchema, loginUserSchema } from "@repo/common/types";
import { middleware } from "./middleware";

const app = express();
const PORT = 5001;

app.post('/signup', (req, res) => {
  const data = createUserSchema.safeParse(req.body);
  if(!data.success) {
    res.json({
      message: "Failed to sign up",
    })
  }

  res.json({
    success: true,
  })
});

app.post('/signin', (req, res) => {
  const data = loginUserSchema.safeParse(req.body);
  if(!data.success) {
    res.json({
      message: "Failed to login",
    })
  }

  const userId = 32;
  const token = jwt.sign({
      id: userId,
  }, JWT_SECRET);

  res.json({
    token
  })
});

app.post('/room', middleware,  (req, res) => {
  res.json({
    roomId: 231
  })
});

app.listen(PORT,  () => {
  console.info(`HTTP Server running at http://localhost:${PORT}`);
});