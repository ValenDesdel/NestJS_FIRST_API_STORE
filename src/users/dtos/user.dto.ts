import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly lastname: string;

    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @IsString()
    @IsNotEmpty()
    readonly phone: string;

    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    readonly documentId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {//EXTIENDE DE CREATEPRODUCT Y SE TRAE LAS VALIDACIONES
}