"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlUserRepository = void 0;
const mysql_1 = require("../../database/mysql");
const User_1 = require("../domain/User");
const entityUser_1 = require("../../database/entities/entityUser");
class MysqlUserRepository {
    constructor() {
        this.dataSource = mysql_1.database.getDataSource();
    }
    create(name, lastname, password, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepository = this.dataSource.getRepository(entityUser_1.UserE);
                const userNew = userRepository.create({
                    name: name,
                    lastname: lastname,
                    password: password,
                    username: username,
                });
                const savedUser = yield userRepository.save(userNew);
                const user = new User_1.User(savedUser.id, savedUser.name, savedUser.lastname, savedUser.username, savedUser.password);
                return user;
            }
            catch (error) {
                console.error("Error al crear el usuario:", error);
                return null;
            }
        });
    }
    auth(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = this.dataSource.getRepository(entityUser_1.UserE);
            console.log(username);
            const savedUser = yield userRepository.findOneBy({ username: username });
            console.log(savedUser);
            if (savedUser == null)
                return null;
            const user = new User_1.User(savedUser.id, savedUser.name, savedUser.lastname, savedUser.username, savedUser.password);
            return user || null;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
}
exports.MysqlUserRepository = MysqlUserRepository;
