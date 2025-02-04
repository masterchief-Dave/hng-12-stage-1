import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @HttpCode(HttpStatus.OK)
  health(): { message: string; live: string } {
    return {
      message: 'Server is active 🚀🚀',
      live: new Date().toUTCString(),
    }
  }

  @Get('/classify-number')
  @HttpCode(HttpStatus.OK)
  getClassification(@Query('number') number: number) {
    const response = this.appService.fetchClassification(Number(number))
    return response
  }
}
