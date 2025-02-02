import { Product } from "../domain/Product";
import { productRepository } from "../domain/IProductRepository";

export class CreateProductUseCase {
  constructor(readonly productRepository: productRepository) {}

  async run(
    name: string,
    cantidad: number,
    precio: number
  ): Promise<Product | null> {
    try {
      const productNew = await this.productRepository.Create(
        name,
        precio,
        cantidad
      );

      if (typeof productNew != null) {
        return productNew;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
