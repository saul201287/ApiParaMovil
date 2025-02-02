import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { corsOptions } from "./config/cors";
import { database } from "./database/mysql";
import { userRouter } from "./user/infraestructure/routers/userRouter";
import { productRouter } from "./product/infraestructure/routers/productRouters";

dotenv.config();

const app = express();

app.use(helmet.hidePoweredBy());
app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  })
);
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

const logger = new Signale({
  secrets: ["([0-9]{4}-?)+"],
});

const port = process.env.PORT || 3000;

try {
  database.connect();
  console.log("Servidor iniciado correctamente");
  app.listen(port, () => {
    logger.success("Server listening on port:", port);
  });
} catch (error) {
  console.error("No se pudo iniciar el servidor:", error);
}
