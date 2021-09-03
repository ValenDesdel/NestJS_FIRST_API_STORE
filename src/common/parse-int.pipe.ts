import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {//VALUE: STRING PARA PARSEARLO A STRING
    const val = parseInt(value, 10);//REALIZA LA TRANSFORMACIÓN A STRING (LA BASE 10 SON LOS NUMEROS DEL 0 AL 9)
    if (isNaN(val)){//VALIDACIÓN SI PUDO REALIZAR LA TRANSFORMACIÓN
      throw new BadRequestException(`${value} is not an number`)//EXCEPTION
    }
    return val;
  }
}
