import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "../../application/CreateUserUseCase";

export class CreateUserController {
  constructor(readonly createUserUseCase: CreateUserUseCase) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    try {
      const user = await this.createUserUseCase.run(
        data.name,
        data.lastname,
        data.password,
        data.username
      );
      if (user) {
        const responseData = {
          id: user?.id,
          name: user?.name,
          lastname: user?.lastname,
          password: user?.password,
          user: user?.username,
        };
        return res.status(201).send({
          status: "recurso creado",
          data: responseData,
        });
        //res.locals.user = responseData;
        //return next();
      } else {
        return res.status(409).send({
          status: "error",
          data: "NO fue posible agregar el registro",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: "error",
        data: "Ocurrió un error",
        mesagges: error,
      });
    }
  }
}
