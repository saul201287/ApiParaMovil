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
exports.AuthServices = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const mysql_1 = require("../database/mysql");
const entityUser_1 = require("../database/entities/entityUser");
class AuthServices {
    createToken(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = process.env.SECRET_KEY_TOKEN;
                const payload = { id, name };
                return (0, jsonwebtoken_1.sign)(payload, secret, { expiresIn: "1h" });
            }
            catch (error) {
                console.error("Error creating token:", error);
                return "error: " + error;
            }
        });
    }
    validateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = process.env.SECRET_KEY_TOKEN;
                let access;
                try {
                    access = (0, jsonwebtoken_1.verify)(token, secret);
                }
                catch (error) {
                    if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                        const decodedToken = (0, jsonwebtoken_1.verify)(token, secret, {
                            ignoreExpiration: true,
                        });
                        const newToken = yield this.createToken(decodedToken.id, decodedToken.name);
                        return newToken;
                    }
                    else {
                        console.error("Invalid token:", error);
                        return false;
                    }
                }
                const dataSource = mysql_1.database.getDataSource();
                const userRepository = dataSource.getRepository(entityUser_1.UserE);
                const user = yield userRepository.findOneBy({ id: access.id });
                if (user) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error("Error validating token:", error);
                return false;
            }
        });
    }
}
exports.AuthServices = AuthServices;
