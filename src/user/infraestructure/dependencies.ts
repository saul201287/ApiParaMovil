import { CreateUserUseCase } from "../application/CreateUserUseCase";
import { AuthUserUseCase } from "../application/AuthUserUseCase";
import { CreateUserController } from "./controllers/CreateUserController";
import { AuthUserControll } from "./controllers/AuthUserController";
import { MysqlUserRepository } from "./mysqlUserRepository";
import { EncryptServices } from "./servicesEncrypt";

const mysqlUserRepository = new MysqlUserRepository();
const encryptServices = new EncryptServices();

const createUserUseCase = new CreateUserUseCase(
  mysqlUserRepository,
  encryptServices
);
const authUserUseCase = new AuthUserUseCase(
  mysqlUserRepository,
  encryptServices
);

export const createUserController = new CreateUserController(createUserUseCase);
export const authUserController = new AuthUserControll(authUserUseCase);
