import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ProductsModule, UsersModule, HttpModule, DatabaseModule],
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
