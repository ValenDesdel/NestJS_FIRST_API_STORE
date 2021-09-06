import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; //PARA USAR LAS VALIDACIONES
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; //SWAGGER

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //CON ESTO NOS VALIDA QUE NO SE ENVIE NADA QUE NO ESTÁ EN EL DTO (ignora campos extras)
      forbidNonWhitelisted: true, //ALERTA EL CAMPO EXTRA
    }),
  ); //CON ESTO PUEDO UTILIZAR LAS VALIDACIONES GLOBALMENTE

  const config = new DocumentBuilder() //SWAGGER
    .setTitle('API')
    .setDescription('Platzi Store')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors(); //CON ESTO PUEDE SER CONSULTADA DESDE CUALQUIER APP FUERA DEL DOMINIO

  await app.listen(process.env.PORT || 3000); //DEPLOYMENT HEROKU
}
bootstrap();
