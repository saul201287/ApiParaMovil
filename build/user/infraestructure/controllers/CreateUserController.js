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
exports.CreateUserController = void 0;
class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    run(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const user = yield this.createUserUseCase.run(data.name, data.lastname, data.password, data.username);
                if (user) {
                    const responseData = {
                        id: user === null || user === void 0 ? void 0 : user.id,
                        name: user === null || user === void 0 ? void 0 : user.name,
                        lastname: user === null || user === void 0 ? void 0 : user.lastname,
                        password: user === null || user === void 0 ? void 0 : user.password,
                        user: user === null || user === void 0 ? void 0 : user.username,
                    };
                    return res.status(201).send({
                        messages: "recurso creado",
                        data: responseData,
                    });
                    //res.locals.user = responseData;
                    //return next();
                }
                else {
                    return res.status(409).send({
                        status: "error",
                        data: "NO fue posible agregar el registro",
                    });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).send({
                    status: "error",
                    data: "Ocurrió un error",
                    mesagges: error,
                });
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
