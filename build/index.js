"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const signale_1 = require("signale");
const dotenv = __importStar(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./config/cors");
const mysql_1 = require("./database/mysql");
const userRouter_1 = require("./user/infraestructure/routers/userRouter");
const productRouters_1 = require("./product/infraestructure/routers/productRouters");
dotenv.config();
const app = (0, express_1.default)();
app.use(helmet_1.default.hidePoweredBy());
app.use(helmet_1.default.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)(cors_2.corsOptions));
app.use(express_1.default.json());
app.use("/user", userRouter_1.userRouter);
app.use("/product", productRouters_1.productRouter);
app.get("/", (req, res) => {
    res.send("API is running");
});
const logger = new signale_1.Signale({
    secrets: ["([0-9]{4}-?)+"],
});
const port = process.env.PORT || 3000;
try {
    mysql_1.database.connect();
    console.log("Servidor iniciado correctamente");
    app.listen(port, () => {
        logger.success("Server listening on port:", port);
    });
}
catch (error) {
    console.error("No se pudo iniciar el servidor:", error);
}
