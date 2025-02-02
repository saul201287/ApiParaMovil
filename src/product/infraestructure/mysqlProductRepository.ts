import { database } from "../../database/mysql";
import { DataSource } from "typeorm";
import { Product } from "../domain/Product";
import { EntityProduct } from "../../database/entities/entityProduct";
import { productRepository } from "../domain/IProductRepository";

export class MysqlProductRepository implements productRepository {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = database.getDataSource();
  }

  async Create(
    name: string,
    costo: number,
    cantidad: number
  ): Promise<Product | null> {
    try {
      const productRepository = this.dataSource.getRepository(EntityProduct);

      const productNew = productRepository.create({
        name: name,
        costo: costo,
        cantidad: cantidad,
      });

      const savedProduct = await productRepository.save(productNew);

      const product = new Product(
        savedProduct.id!,
        savedProduct.name!,
        savedProduct.costo!,
        savedProduct.cantidad!
      );

      return product;
    } catch (error) {
      console.error("Error al crear el producto:", error);
      return null;
    }
  }
  async GetAll(): Promise<Product[] | null> {
    const productRepository = this.dataSource.getRepository(EntityProduct);
    const savedProduct = await productRepository.find();
    if (savedProduct == null || savedProduct.length < 1) return null;
    const products = savedProduct.map(
      (product: any) =>
        new Product(product.id, product.name, product.cantidad, product.costo)
    );
    return products || null;
  }

  async GetById(id: number): Promise<Product | null> {
    return null;
  }
}
