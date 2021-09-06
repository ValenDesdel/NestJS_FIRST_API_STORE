import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator'; //VALIDADORES
import { PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString() //VALIDADOR
  @IsNotEmpty()
  readonly name: string; //CON EL READONLY EL ATRIBUTO SERÁ GUARDADO EXACTAMENTR IGUAL EN LA BDD YA QUE NO PUEDE SER MANIPULADO

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  //EXTIENDE DE CREATEPRODUCT Y SE TRAE LAS VALIDACIONES
}
