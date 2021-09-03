import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
  @Inject('API_KEY') private apiKey: string, 
  @Inject('TASKS') private tasks: any[]){}//SE INYECTA EL VALOR QUE SE QUIERE USAR A TRAVÉS DE TODA LA APP
  getHello(): string {
    console.log(this.tasks);
    return `Hello World! ${this.apiKey}`;
  }
}
