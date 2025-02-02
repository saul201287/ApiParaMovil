import { User } from "../domain/User";
import { userRepository } from "../domain/IUserRepository";
import { IEncrypt } from "./services/IEncrypts";

export class CreateUserUseCase {
  constructor(
    readonly userRepository: userRepository,
    readonly options: IEncrypt
  ) {}

  async run(
    name: string,
    lastname: string,
    password: string,
    user: string
  ): Promise<User | null> {
    try {
      const newPassword = await this.options.encodePassword(password);
      const userNew = await this.userRepository.create(
        name,
        lastname,
        newPassword,
        user
      );

      if (typeof userNew != null) {
        return userNew;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
