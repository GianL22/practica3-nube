import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('status')
  ping(): { message: string } {
    return { message: 'pong' };
  }
}
