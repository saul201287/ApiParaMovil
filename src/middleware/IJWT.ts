export interface AuthRepository {
  createToken(id: number, name:string): Promise<string>;
  validateToken(token: string): Promise<boolean | string>;
}
