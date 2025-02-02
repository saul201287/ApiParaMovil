import { Request, Response } from "express";
import { GetAllProductsUseCase } from "../../application/GetAllProductsUseCase";

export class GetAllProductsController {
  constructor(readonly getAllProductsUseCase: GetAllProductsUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const products = await this.getAllProductsUseCase.run();

      if (products && products.length > 0) {
        const responseData = products.map((product) => ({
          id: product?.id,
          name: product?.name,
          cantidad: product?.cantidad,
          costo: product?.costo,
        }));

        return res.status(200).send({
          messages: "recurso obtenido",
          data: responseData,
        });
      } else {
        return res.status(404).send({
          messages: "error",
          data: "No hay registros disponibles",
        });
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return res.status(500).send({
        status: "error",
        message: "Ocurrió un error al procesar la solicitud",
        error: error,
      });
    }
  }
}
