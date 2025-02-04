import { HttpException, HttpStatus } from '@nestjs/common'

export class InvalidNumberException extends HttpException {
  constructor() {
    super(
      {
        number: 'alphabet',
        error: true,
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}
