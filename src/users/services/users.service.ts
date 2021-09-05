import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity'; //IMPORTO LA ENTIDAD PRODUCT
import { Order } from '../entities/order.entity';//IMPORTO LA ENTIDAD ORDER

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {
    constructor(private productsService: ProductsService,//INYECCION DE PRODUCTSSERVICE
        private configService: ConfigService,//INYECCION DE API_KEY
        ) {}


    private counterId = 1;//CONTADOR ID
    private users: User[] /*LO PONGO DE CLASE PRODUCT*/= [{
        id: 1,
        name: 'Heisenberg',
        lastname: 'as',
        address: 'Los Pollos Hermanos',
        phone: '444',
        documentId: 1212,
    }]; //ME TRAIGO LAS CARACTERISTICAS QUE TIENE LA ENTIDAD


    findAll(): User[] {//ME RETORNA TODOS LOS PRODUCTOS
        Logger.log(JSON.stringify(this.users), 'findAll')
        if(this.users === null){
            throw new NotFoundException(`Users not found`);//MANEJO DE ERRORES
        }
        return this.users;
    }

    findOne(id: number){//BUSCA UN PRODUCTO EN ESPECIFICO
        const user = this.users.find(item => item.id === id);//UTILIZO FIND() y realizo la verificación
        if(!user){
            throw new NotFoundException(`User #${id} not found`);//MANEJO DE ERRORES
        }
        return user;
    }

    create(payload: CreateUserDto){//METODO PARA CREAR PRODUCTO - ASI ENVIARÁ LO QUE NOSOTROS ESPERAMOS SEGÚN EL DTOS
        this.counterId = this.counterId + 1;//SE LE SUMA AL CONTADOR
        const newUser = {
            id: this.counterId,
            ...payload,
        }; 
        this.users.push(newUser);//SE INSERTA DENTRO DEL ARRAY DE PRODUCTOS
        return newUser;
    }

    update(id: number, payload: UpdateUserDto){//AYUDA A NO COMETER ERRORES DE TIPADO
        const userFind = this.findOne(id);
        Logger.log('Conseguí a ' + userFind.name);
        if(!userFind){
            throw new NotFoundException(`User #${id} not found`);//MANEJO DE ERRORES
        }
        const index = this.users.findIndex((item) => item.id === id);
        this.users[index] = {
            ...userFind,
            ...payload,
        };
        return this.users[index];
    }

    remove(id: number){
        const index = this.users.findIndex((item) => item.id === id);
        if (index === -1){
            throw new NotFoundException(`User #${id} not found`);//MANEJO DE ERRORES
        }
        this.users.splice(index, 1);
        return true;
    }

    getOrderByUser(id: number): Order{
        const user = this.findOne(id);
        return {
            date: new Date(),
            user,
            products: this.productsService.findAll(),
        };
    }
}