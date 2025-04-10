"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("../dependencies");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/", (req, res, next) => {
    dependencies_1.createUserController
        .run(req, res, next)
        .then((user) => {
        return user;
    })
        .catch((err) => {
        res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
exports.userRouter.post("/login", (req, res, next) => {
    dependencies_1.authUserController
        .run(req, res, next)
        .then((user) => {
        return user;
    })
        .catch((err) => {
        res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
