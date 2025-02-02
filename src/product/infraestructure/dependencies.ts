import { CreateProductUseCase } from "../application/CreateProductUseCase";
import { GetAllProductsUseCase } from "../application/GetAllProductsUseCase";
import { CreateProductController } from "./controllers/CreateProductController";
import { GetAllProductsController } from "./controllers/GetAllProductsController";
import { MysqlProductRepository } from "./mysqlProductRepository";

const mysqlProductRepository = new MysqlProductRepository();

const createUserUseCase = new CreateProductUseCase(mysqlProductRepository);
const getAllProductsUseCase = new GetAllProductsUseCase(mysqlProductRepository);

export const createProductController = new CreateProductController(
  createUserUseCase
);
export const getAllProductsController = new GetAllProductsController(
  getAllProductsUseCase
);
