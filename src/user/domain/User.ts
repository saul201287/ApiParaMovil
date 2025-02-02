export class User{
  constructor(
    readonly id: number,
    readonly name: string,
    readonly lastname: string,
    readonly username: string,
    readonly password: string
  ) {}
}
