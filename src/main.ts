import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';//PARA USAR LAS VALIDACIONES

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,//CON ESTO NOS VALIDA QUE NO SE ENVIE NADA QUE NO ESTÁ EN EL DTO (ignora campos extras)
    forbidNonWhitelisted: true, //ALERTA EL CAMPO EXTRA
  }));//CON ESTO PUEDO UTILIZAR LAS VALIDACIONES GLOBALMENTE
  await app.listen(3000);
}
bootstrap();
