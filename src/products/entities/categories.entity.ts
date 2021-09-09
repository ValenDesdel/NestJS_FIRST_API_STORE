import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";

import { Product } from "./product.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255})
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  //@ManyToMany(() => Product, (product) => product.categories)
  //@JoinTable() ESTO VA EN UN SOLO SITIO 
  //products: Product[]; ASI SE MANEJARIA LA RELACION MUCHOS A MUCHOS
}
