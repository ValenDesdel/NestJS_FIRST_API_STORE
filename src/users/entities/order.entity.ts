import { User } from './user.entity';//ME TRAIGO USER
import { Product } from 'src/products/entities/product.entity'; //ME TRAIGO PRODUCT DEL OTRO MODULO

export class Order {
    date: Date;
    user: User; //Tendrá un user de tipo User
    products: Product[]; //Array de products que tendrá la Order
}