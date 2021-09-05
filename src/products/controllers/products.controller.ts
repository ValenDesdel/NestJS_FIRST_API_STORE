import { Controller, Get, Query, Param, Post, Body, Put, Delete,HttpStatus, HttpCode, Res, Logger } from '@nestjs/common';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@ApiTags('products')//ASI LAS SEGMENTAMOS EN SWAGGER
@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService){}//INYECCION DE DEPENDENCIAS DEL SERVICIO DE PRODUCTS

  @ApiOperation({summary: 'List of products'})
  @Get(':id') //RECIBIENDO PARAMETRO
  getProduct(@Param('id', ParseIntPipe) id: number) {//PIPE PARA TRANSFORMAR Y VALIDAR QUE ES UN INT
    const productos = this.productsService.findOne(+id);
    Logger.log(JSON.stringify(productos))//USAR PARA REVISAR POR CONSOLA
    return productos;//ENCUENTRO UNO CON EL METODO EN SERVICE Y LE PASO POR PARAMETRO EL ID NECESARIO
  }

  @Get() 
  getProductsAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    //RETORNARÁ TODOS DESDE EL METODO QUE ESTÁ EN SERVICIO
    const productos = this.productsService.findAll();
    Logger.log(JSON.stringify(productos)) //USAR PARA REVISAR POR CONSOLA
    return productos;
  }


  @Post() //CREAR
  create(@Body() payload: CreateProductDto) { //ASI ENVIARÁ LO QUE NOSOTROS ESPERAMOS SEGÚN EL DTOS
    //CON EL PAYLOAD ES CUANDO SE RECIBIRÁ
    this.productsService.create(payload); //CREACIÓN CON EL METODO QUE ESTÁ EN SERVICIO
  }

  @Put('update/:id')//PARAMETRO DE QUÉ VAMOS A EDITAR //---------------PREGUNTAR
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);//UPDATE CON EL METODO QUE SE ENCUENTRA EN SERVICIO
  }

  @Delete(':id')
  delete(@Param('id') id: string){
    return this.productsService.remove(+id);
  }
}
