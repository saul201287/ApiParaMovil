import { Product } from "./Product";

export interface productRepository {
  Create(
    name: string,
    costo: number,
    cantidad: number
  ): Promise<Product | null>;
  GetAll(): Promise<Product[] | null>;
  GetById(id: number): Promise<Product | null>;
}
