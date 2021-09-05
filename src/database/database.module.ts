import { Module, Global } from '@nestjs/common';

const API_KEY='12345634';
const API_KEY_PROD='PAWUERRANYER';

@Global()//ESTARÁ INSTANCIADO PARA TODA LA APP GLOBALMENTE
@Module({
    providers: [
        {
            provide: 'API_KEY',
            useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,//DEPENDIENDO DEL AMBIENTE CORRE ALGUNA DE LAS DOS API
        },
    ],
    exports: ['API_KEY'],
})
export class DatabaseModule {}
