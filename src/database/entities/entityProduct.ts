import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("products")
export class EntityProduct {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({ type: "double" })
  costo?: number;

  @Column()
  cantidad?: number;
}
