import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/server-common/config";
import { createUserSchema, loginUserSchema } from "@repo/common/types";
import { middleware } from "./middleware";
import { prismaClient } from "@repo/db/client";
import cors from "cors";

const app = express();
const PORT = 5002;

app.use(express.json());
app.use(cors());

app.post('/signup', async (req, res) => {
  const parsedData = createUserSchema.safeParse(req.body);
  if(!parsedData.success) {
    res.json({
      message: "Failed to sign up",
    })
  }
  try {
    await prismaClient.user.create({
      data: {
        //@ts-ignore
        fullName: parsedData.data.fullName,
        //@ts-ignore
        email: parsedData.data.email,
        //@ts-ignore
        password: parsedData.data.password
      }
    });
    res.json({
      success: true,
    })
  } catch (error) {
    res.status(411).json({
      message: "User already exists",
    });
  }
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