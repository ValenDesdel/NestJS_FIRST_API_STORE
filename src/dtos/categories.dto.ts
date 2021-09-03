import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive } from 'class-validator';//VALIDADORES
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategotyDto {
    @IsString()//VALIDADOR
    @IsNotEmpty()
    readonly name: string; //CON EL READONLY EL ATRIBUTO SERÁ GUARDADO EXACTAMENTR IGUAL EN LA BDD YA QUE NO PUEDE SER MANIPULADO

    @IsString()
    @IsNotEmpty()
    readonly description: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategotyDto) {//EXTIENDE DE CREATEPRODUCT Y SE TRAE LAS VALIDACIONES
}