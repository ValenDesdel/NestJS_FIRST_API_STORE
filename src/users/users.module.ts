import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';

import { ProductsModule } from '../products/products.module';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}