import { verify, sign, TokenExpiredError } from "jsonwebtoken";
import { database } from "../database/mysql";
import { AuthRepository } from "./IJWT";
import { UserE } from "../database/entities/entityUser";

export class AuthServices implements AuthRepository {
  async createToken(id: number, name: string): Promise<string> {
    try {
      const secret = process.env.SECRET_KEY_TOKEN as string;
      const payload = { id, name };
      return sign(payload, secret, { expiresIn: "1h" });
    } catch (error) {
      console.error("Error creating token:", error);
      return "error: " + error;
    }
  }

  async validateToken(token: string): Promise<boolean | string> {
    try {
      const secret = process.env.SECRET_KEY_TOKEN as string;

      let access: any;
      try {
        access = verify(token, secret);
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          const decodedToken = verify(token, secret, {
            ignoreExpiration: true,
          }) as any;
          const newToken = await this.createToken(
            decodedToken.id,
            decodedToken.name
          );
          return newToken;
        } else {
          console.error("Invalid token:", error);
          return false;
        }
      }

      const dataSource = database.getDataSource();
      const userRepository = dataSource.getRepository(UserE);

      const user = await userRepository.findOneBy({ id: access.id });
      if (user) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  }
}
