import express from "express";
import { createUserController, authUserController } from "../dependencies";

export const userRouter = express.Router();

userRouter.post("/", (req, res, next) => {
  createUserController
    .run(req, res, next)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

userRouter.post("/login", (req, res, next) => {
  authUserController
    .run(req, res, next)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
