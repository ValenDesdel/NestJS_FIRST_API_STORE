import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  role: string;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })//RELACIÓN 1 a 1
  @JoinColumn()//CREA LA RELACIÓN CON LA MIGRACIÓN (SOLO DEBE IR EN UN LADO, YA QUE SERÁ QUIEN CARGA LA RELACIÓN)
  customer: Customer;
}
