import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

import { ProductsModule } from 'src/products/products.module'; //ME TRAIGO EL PRODUCTSMODULE


@Module({
  imports: [ProductsModule], //ACÁ IMPORTO PRODUCTSMODULE
  providers: [ UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
