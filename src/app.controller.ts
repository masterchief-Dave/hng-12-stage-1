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
  getClassification(@Query('number') number: number) {
    if (number.toString().includes('.') || isNaN(Number(number))) {
      throw new InvalidNumberException(number.toString())
    }
    const response = this.appService.fetchClassification(
      Number(Math.abs(number)),
    )
    return response
  }
}
