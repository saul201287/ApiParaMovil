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
exports.MysqlProductRepository = void 0;
const mysql_1 = require("../../database/mysql");
const Product_1 = require("../domain/Product");
const entityProduct_1 = require("../../database/entities/entityProduct");
class MysqlProductRepository {
    constructor() {
        this.dataSource = mysql_1.database.getDataSource();
    }
    Create(name, costo, cantidad) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productRepository = this.dataSource.getRepository(entityProduct_1.EntityProduct);
                const productNew = productRepository.create({
                    name: name,
                    costo: costo,
                    cantidad: cantidad,
                });
                const savedProduct = yield productRepository.save(productNew);
                const product = new Product_1.Product(savedProduct.id, savedProduct.name, savedProduct.costo, savedProduct.cantidad);
                return product;
            }
            catch (error) {
                console.error("Error al crear el producto:", error);
                return null;
            }
        });
    }
    GetAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepository = this.dataSource.getRepository(entityProduct_1.EntityProduct);
            const savedProduct = yield productRepository.find();
            if (savedProduct == null || savedProduct.length < 1)
                return null;
            const products = savedProduct.map((product) => new Product_1.Product(product.id, product.name, product.cantidad, product.costo));
            return products || null;
        });
    }
    GetById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
}
exports.MysqlProductRepository = MysqlProductRepository;
