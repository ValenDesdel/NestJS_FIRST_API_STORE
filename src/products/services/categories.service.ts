import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/categories.entity'; //IMPORTO LA ENTIDAD PRODUCT
import { CreateCategotyDto, UpdateCategoryDto } from 'src/products/dtos/categories.dto';

@Injectable()
export class CategoriesService {
    private counterId = 1;//CONTADOR ID
    private categories: Category[] /*LO PONGO DE CLASE CATEGORIA*/= [{
        id: 1,
        name: 'Category 1',
        description: 'blank',
    }]; //ME TRAIGO LAS CARACTERISTICAS QUE TIENE LA ENTIDAD


    findAll(): Category[] {//ME RETORNA TODOS LAS CATEGORIAS
        Logger.log(JSON.stringify(this.categories), 'findAll')
        if(this.categories === null){
            throw new NotFoundException(`Categories not found`);//MANEJO DE ERRORES
        }
        return this.categories;
    }

    findOne(id: number){//BUSCA UN PRODUCTO EN ESPECIFICO
        const category = this.categories.find(item => item.id === id);//UTILIZO FIND() y realizo la verificación
        if(!category){
            throw new NotFoundException(`Category #${id} not found`);//MANEJO DE ERRORES
        }
        return category;
    }

    create(payload: CreateCategotyDto){//METODO PARA CREAR PRODUCTO - ASI ENVIARÁ LO QUE NOSOTROS ESPERAMOS SEGÚN EL DTOS
        this.counterId = this.counterId + 1;//SE LE SUMA AL CONTADOR
        const newCategory = {
            id: this.counterId,
            ...payload,
        }; 
        this.categories.push(newCategory);//SE INSERTA DENTRO DEL ARRAY DE PRODUCTOS
        return newCategory;
    }

    update(id: number, payload: UpdateCategoryDto){//AYUDA A NO COMETER ERRORES DE TIPADO
        const categoryFind = this.findOne(id);
        Logger.log('Conseguí ' + categoryFind);
        if(!categoryFind){
            throw new NotFoundException(`category #${id} not found`);//MANEJO DE ERRORES
        }
        const index = this.categories.findIndex((item) => item.id === id);
        this.categories[index] = {
            ...categoryFind,
            ...payload,
        };
        return this.categories[index];
    }

    remove(id: number){
        const index = this.categories.findIndex((item) => item.id === id);
        if (index === -1){
            throw new NotFoundException(`category #${id} not found`);//MANEJO DE ERRORES
        }
        this.categories.splice(index, 1);
        return true;
    }
}
