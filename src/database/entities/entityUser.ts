import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class UserE {
  @PrimaryGeneratedColumn({ type: "int" })
  id?: number;

  @Column()
  name?: string;

  @Column()
  lastname?: string;

  @Column()
  password?: string;

  @Column()
  username?: string;
}
