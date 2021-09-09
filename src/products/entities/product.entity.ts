import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

import { Category } from './categories.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255})
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  @ManyToOne(() => Category, (category) => category.products)//ESTA ES LA QUE TENDRÁ LA FK
  category: Category;

  //@ManyToMany(() => Category, (category) => category.products)
  //categories: Category[]; ASI SE MANEJARIA LA RELACION MUCHOS A MUCHOS
}
