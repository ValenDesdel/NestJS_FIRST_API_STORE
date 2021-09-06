import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Product } from '../entities/product.entity'; //IMPORTO LA ENTIDAD PRODUCT
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  private counterId = 1; //CONTADOR ID
  private products: Product[] /*LO PONGO DE CLASE PRODUCT*/ = [
    {
      id: 1,
      name: 'Product 1',
      description: 'blank',
      price: 122,
      image: '',
      stock: 12,
    },
  ]; //ME TRAIGO LAS CARACTERISTICAS QUE TIENE LA ENTIDAD

  findAll(): Product[] {
    //ME RETORNA TODOS LOS PRODUCTOS
    Logger.log(JSON.stringify(this.products), 'findAll');
    if (this.products === null) {
      throw new NotFoundException(`Products not found`); //MANEJO DE ERRORES
    }
    return this.products;
  }

  findOne(id: number) {
    //BUSCA UN PRODUCTO EN ESPECIFICO
    const product = this.products.find((item) => item.id === id); //UTILIZO FIND() y realizo la verificación
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`); //MANEJO DE ERRORES
    }
    return product;
  }

  create(payload: CreateProductDto) {
    //METODO PARA CREAR PRODUCTO - ASI ENVIARÁ LO QUE NOSOTROS ESPERAMOS SEGÚN EL DTOS
    this.counterId = this.counterId + 1; //SE LE SUMA AL CONTADOR
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct); //SE INSERTA DENTRO DEL ARRAY DE PRODUCTOS
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    //AYUDA A NO COMETER ERRORES DE TIPADO
    const productFind = this.findOne(id);
    Logger.log('Conseguí ' + productFind);
    if (!productFind) {
      throw new NotFoundException(`Product #${id} not found`); //MANEJO DE ERRORES
    }
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...productFind,
      ...payload,
    };
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`); //MANEJO DE ERRORES
    }
    this.products.splice(index, 1);
    return true;
  }
}
