import { NextFunction, Request, Response } from "express";
import { AuthUserUseCase } from "../../application/AuthUserUseCase";

export class AuthUserControll {
  constructor(readonly getUserUseCase: AuthUserUseCase) {}

  async run(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    console.log(data.username);
    
    try {
      const userN = await this.getUserUseCase.run(data.username, data.password);
      console.log(userN);
      
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
