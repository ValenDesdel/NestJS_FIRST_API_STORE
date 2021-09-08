import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Customer {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })//SE ESPECIFICA QUIEN TIENE LA DIFERENCIA
  user: User;

}
