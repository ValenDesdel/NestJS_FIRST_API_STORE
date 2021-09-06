import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';

import { ProductsController } from './controllers/products.controller'; //IMPORTO CONTROLADOR
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service'; //IMPORTO SERVICIO

@Module({
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService, CategoriesService],
  exports: [ProductsService], //ME AYUDA A EXPORTAR PARA SER UTILIZADOS EN OTROS MODULOS
})
export class ProductsModule {}
