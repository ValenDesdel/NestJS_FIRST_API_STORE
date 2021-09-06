import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    //ENDPOINT
    return this.appService.getHello();
  }

  @Get('nuevo') //ENDPOINT
  newEndpoint() {
    return 'Yo soy nuevo';
  }
}
