"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("../dependencies");
exports.productRouter = express_1.default.Router();
exports.productRouter.post("/", (req, res) => {
    dependencies_1.createProductController
        .run(req, res)
        .then((user) => {
        return user;
    })
        .catch((err) => {
        res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
exports.productRouter.get("/", (req, res) => {
    dependencies_1.getAllProductsController
        .run(req, res)
        .then((user) => {
        return user;
    })
        .catch((err) => {
        res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
