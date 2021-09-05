import { Controller, Get, Query, Param, Post, Body, Put, Delete,HttpStatus, HttpCode, Res, Logger } from '@nestjs/common';
import { ParseIntPipe } from '../../common/parse-int.pipe';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService){}//INYECCION DE DEPENDENCIAS DEL SERVICIO DE PRODUCTS

  @Get(':id/orders')//ME VA A TRAER LAS ORDENES POR EL IDE DE CLIENTE
  getOrders(@Param('id', ParseIntPipe) id: number){
      return this.userService.getOrderByUser(id);
  }

  @Get(':id') //RECIBIENDO PARAMETRO
  getProduct(@Param('id', ParseIntPipe) id: number) {//PIPE PARA TRANSFORMAR Y VALIDAR QUE ES UN INT
    const users = this.userService.findOne(+id);
    Logger.log(JSON.stringify(users))//USAR PARA REVISAR POR CONSOLA
    return users;//ENCUENTRO UNO CON EL METODO EN SERVICE Y LE PASO POR PARAMETRO EL ID NECESARIO
  }

  @Get() 
  getUsersAll(
    //@Query('limit') limit: number,
    //@Query('offset') offset: number,
  ) {
    //RETORNARÁ TODOS DESDE EL METODO QUE ESTÁ EN SERVICIO
    const users = this.userService.findAll();
    Logger.log(JSON.stringify(users)) //USAR PARA REVISAR POR CONSOLA
    return users
  }


  @Post() //CREAR
  create(@Body() payload: CreateUserDto) { //ASI ENVIARÁ LO QUE NOSOTROS ESPERAMOS SEGÚN EL DTOS
    //CON EL PAYLOAD ES CUANDO SE RECIBIRÁ
    this.userService.create(payload); //CREACIÓN CON EL METODO QUE ESTÁ EN SERVICIO
  }

  @Put('update/:id')//PARAMETRO DE QUÉ VAMOS A EDITAR //---------------PREGUNTAR
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.userService.update(+id, payload);//UPDATE CON EL METODO QUE SE ENCUENTRA EN SERVICIO
  }

  @Delete(':id')
  delete(@Param('id') id: string){
    return this.userService.remove(+id);
  }
}
