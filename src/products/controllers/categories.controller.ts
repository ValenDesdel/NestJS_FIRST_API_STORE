import { Controller, Get, Query, Param, Post, Body, Put, Delete,HttpStatus, HttpCode, Res, Logger } from '@nestjs/common';
import { ParseIntPipe } from '../../common/parse-int.pipe';

import { CategoriesService } from '../services/categories.service';
import { CreateCategotyDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Controller('categories')
export class CategoriesController {

  constructor(private categoriesService: CategoriesService){}//INYECCION DE DEPENDENCIAS DEL SERVICIO DE PRODUCTS


  @Get(':id') //RECIBIENDO PARAMETRO
  getCategory(@Param('id', ParseIntPipe) id: number) {//PIPE PARA TRANSFORMAR Y VALIDAR QUE ES UN INT
    const categories = this.categoriesService.findOne(+id);
    Logger.log(JSON.stringify(categories))//USAR PARA REVISAR POR CONSOLA
    return categories;//ENCUENTRO UNO CON EL METODO EN SERVICE Y LE PASO POR PARAMETRO EL ID NECESARIO
  }

  @Get() 
  getCategoriesAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    //RETORNARÁ TODOS DESDE EL METODO QUE ESTÁ EN SERVICIO
    const categories = this.categoriesService.findAll();
    Logger.log(JSON.stringify(categories)) //USAR PARA REVISAR POR CONSOLA
    return categories;
  }


  @Post() //CREAR
  create(@Body() payload: CreateCategotyDto) { //ASI ENVIARÁ LO QUE NOSOTROS ESPERAMOS SEGÚN EL DTOS
    //CON EL PAYLOAD ES CUANDO SE RECIBIRÁ
    this.categoriesService.create(payload); //CREACIÓN CON EL METODO QUE ESTÁ EN SERVICIO
  }

  @Put('update/:id')//PARAMETRO DE QUÉ VAMOS A EDITAR //---------------PREGUNTAR
  update(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.update(+id, payload);//UPDATE CON EL METODO QUE SE ENCUENTRA EN SERVICIO
  }

  @Delete(':id')
  delete(@Param('id') id: string){
    return this.categoriesService.remove(+id);
  }
}