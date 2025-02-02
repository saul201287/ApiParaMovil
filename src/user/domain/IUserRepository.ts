import { User } from "./User";

export interface userRepository {
  create(
    name: string,
    lastname: string,
    username: string,
    password: string
  ): Promise<User | null>;
  auth(user: string, password: string): Promise<User | null>;
  getAll(): Promise<User[] | null>;
  getById(id: number): Promise<User | null>;
}
