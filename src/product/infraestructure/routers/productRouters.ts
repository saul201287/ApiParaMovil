import express from "express";
import { createProductController, getAllProductsController } from "../dependencies";

export const productRouter = express.Router();

productRouter.post("/", (req, res) => {
  createProductController
    .run(req, res)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

productRouter.get("/", (req, res) => {
  getAllProductsController
    .run(req, res)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
