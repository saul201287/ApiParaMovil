"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsController = exports.createProductController = void 0;
const CreateProductUseCase_1 = require("../application/CreateProductUseCase");
const GetAllProductsUseCase_1 = require("../application/GetAllProductsUseCase");
const CreateProductController_1 = require("./controllers/CreateProductController");
const GetAllProductsController_1 = require("./controllers/GetAllProductsController");
const mysqlProductRepository_1 = require("./mysqlProductRepository");
const mysqlProductRepository = new mysqlProductRepository_1.MysqlProductRepository();
const createUserUseCase = new CreateProductUseCase_1.CreateProductUseCase(mysqlProductRepository);
const getAllProductsUseCase = new GetAllProductsUseCase_1.GetAllProductsUseCase(mysqlProductRepository);
exports.createProductController = new CreateProductController_1.CreateProductController(createUserUseCase);
exports.getAllProductsController = new GetAllProductsController_1.GetAllProductsController(getAllProductsUseCase);
