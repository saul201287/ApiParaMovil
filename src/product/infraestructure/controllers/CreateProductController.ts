import {Request, Response } from "express";
import { CreateProductUseCase } from "../../application/CreateProductUseCase";

export class CreateProductController {
  constructor(readonly createProductUseCase: CreateProductUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const product = await this.createProductUseCase.run(
        data.name,
        data.cantidad,
        data.costo
      );
      if (product) {
        const responseData = {
          id: product?.id,
          name: product?.name,
          cantidad: product?.cantidad,
          costo: product?.costo,
        };
        return res.status(201).send({
          messages: "recurso creado",
          data: responseData,
        });
        //res.locals.product = responseData;
        //return next();
      } else {
        return res.status(409).send({
          messages: "error",
          data: "NO fue posible agregar el registro",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        data: "Ocurrió un error",
        mesagges: error,
      });
    }
  }
}
