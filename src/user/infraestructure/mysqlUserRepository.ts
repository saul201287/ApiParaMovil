import { database } from "../../database/mysql";
import { DataSource } from "typeorm";
import { User } from "../domain/User";
import { UserE } from "../../database/entities/entityUser";
import { userRepository } from "../domain/IUserRepository";

export class MysqlUserRepository implements userRepository {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = database.getDataSource();
  }

  async create(
    name: string,
    lastname: string,
    password: string,
    username: string
  ): Promise<User | null> {
    try {
      const userRepository = this.dataSource.getRepository(UserE);

      const userNew = userRepository.create({
        name: name,
        lastname: lastname,
        password: password,
        username: username,
      });

      const savedUser = await userRepository.save(userNew);

      const user = new User(
        savedUser.id!,
        savedUser.name!,
        savedUser.lastname!,
        savedUser.username!,
        savedUser.password!
      );

      return user;
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      return null;
    }
  }
  async auth(username: string, password: string): Promise<User | null> {
    const userRepository = this.dataSource.getRepository(UserE);
    const savedUser = await userRepository.findOneBy({ username: username });
    if (savedUser == null) return null;
    const user = new User(
      savedUser.id!,
      savedUser.name!,
      savedUser.lastname!,
      savedUser.username!,
      savedUser.password!
    );
    return user || null;
  }
  async getAll(): Promise<User[] | null> {
    return null;
  }
  async getById(id: number): Promise<User | null> {
    return null;
  }
}
