import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroment';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',//ESTO SE REALIZA PARA QUE LEA EL ARCHIVO .env
      load: [config],
      isGlobal: true,//ESTO PARA QUE SEA GLOBAL
      validationSchema: Joi.object({//RECIBIMOS JOU Y DECIMOS QUÉ VAMOS A VALIDAR (ENV)
        //API_KEY: Joi.number().required,
        //DATABASE_NAME: Joi.string().required,
        DATABASE_PORT: Joi.number().required(),
      })
    }),
    ProductsModule, 
    UsersModule,
    HttpModule, 
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {//HACER UNA PETICIÓN ASINCRONA A OTRO SERVICIO
        const tasks = await http.get('https://jsonplaceholder.typicode.com/todos').toPromise();//COMO ES ASINCRONO TARDA EN LEVANTAR EL SERVICIO YA QUE 
        return tasks.data;                                                                     //NO USAR PARA CONEXIONES EXTERNAS SOLO PARA BDD
      },
      inject: [HttpService],
    }
  ],
})
export class AppModule {}
