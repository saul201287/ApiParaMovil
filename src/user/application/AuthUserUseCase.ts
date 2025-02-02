import { userRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";
import { IEncrypt } from "./services/IEncrypts";

export class AuthUserUseCase {
  constructor(
    private readonly userRepository: userRepository,
    private readonly encrypt: IEncrypt
  ) {}

  async run(user: string, password: string): Promise<string | null> {
    try {
      const userN: User|null = await this.userRepository.auth(user, password);

      if (userN !== null) {
         const isPasswordCorrect = await this.encrypt.compareTo(
           password,
           userN.password
         );
          if (!isPasswordCorrect) {
            return null;
          }
        return "Credenciales validas";
      }
      return null
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
