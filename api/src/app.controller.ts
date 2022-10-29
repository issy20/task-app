import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/healthcheck')
  sentOK(@Res() res) {
    res.status(HttpStatus.OK).json({ status: 'ok' });
  }
}
