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
exports.GetAllProductsController = void 0;
class GetAllProductsController {
    constructor(getAllProductsUseCase) {
        this.getAllProductsUseCase = getAllProductsUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.getAllProductsUseCase.run();
                if (products && products.length > 0) {
                    const responseData = products.map((product) => ({
                        id: product === null || product === void 0 ? void 0 : product.id,
                        name: product === null || product === void 0 ? void 0 : product.name,
                        cantidad: product === null || product === void 0 ? void 0 : product.cantidad,
                        costo: product === null || product === void 0 ? void 0 : product.costo,
                    }));
                    return res.status(200).send({
                        messages: "recurso obtenido",
                        data: responseData,
                    });
                }
                else {
                    return res.status(404).send({
                        messages: "error",
                        data: "No hay registros disponibles",
                    });
                }
            }
            catch (error) {
                console.error("Error al obtener los productos:", error);
                return res.status(500).send({
                    status: "error",
                    message: "Ocurrió un error al procesar la solicitud",
                    error: error,
                });
            }
        });
    }
}
exports.GetAllProductsController = GetAllProductsController;
