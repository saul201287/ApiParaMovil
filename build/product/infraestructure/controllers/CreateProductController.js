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
exports.CreateProductController = void 0;
class CreateProductController {
    constructor(createProductUseCase) {
        this.createProductUseCase = createProductUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const product = yield this.createProductUseCase.run(data.name, data.cantidad, data.costo);
                if (product) {
                    const responseData = {
                        id: product === null || product === void 0 ? void 0 : product.id,
                        name: product === null || product === void 0 ? void 0 : product.name,
                        cantidad: product === null || product === void 0 ? void 0 : product.cantidad,
                        costo: product === null || product === void 0 ? void 0 : product.costo,
                    };
                    return res.status(201).send({
                        messages: "recurso creado",
                        data: responseData,
                    });
                    //res.locals.product = responseData;
                    //return next();
                }
                else {
                    return res.status(409).send({
                        messages: "error",
                        data: "NO fue posible agregar el registro",
                    });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).send({
                    data: "Ocurrió un error",
                    mesagges: error,
                });
            }
        });
    }
}
exports.CreateProductController = CreateProductController;
