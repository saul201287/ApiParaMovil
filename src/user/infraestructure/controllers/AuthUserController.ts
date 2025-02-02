import { NextFunction, Request, Response } from "express";
import { AuthUserUseCase } from "../../application/AuthUserUseCase";

export class AuthUserControll {
  constructor(readonly getUserUseCase: AuthUserUseCase) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    try {
      const userN = await this.getUserUseCase.run(data.user, data.password);

      if (userN != null) {
        res.locals.user = userN;
        //next();
        res.status(200).json({
          error: "Credenciales validas",
        });
      } else {
        res.status(401).json({
          error: "Credenciales invalidas",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: error,
      });
    }
  }
}
