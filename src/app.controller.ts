import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common'
import { AppService } from './app.service'
import { InvalidNumberException } from './exceptions/index.exception'

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
  getClassification(@Query('number') number: string) {
    if (number.toString().includes('.') || isNaN(Number(number))) {
      throw new InvalidNumberException()
    }
    const response = this.appService.fetchClassification(Number(number))
    return response
  }
}
