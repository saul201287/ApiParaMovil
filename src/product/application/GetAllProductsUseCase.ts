import { Product } from "../domain/Product";
import { productRepository } from "../domain/IProductRepository";

export class GetAllProductsUseCase {
  constructor(readonly productRepository: productRepository) {}

  async run(): Promise<Product[] | null> {
    try {
      const products = await this.productRepository.GetAll();

      if (typeof products != null) {
        return products;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
