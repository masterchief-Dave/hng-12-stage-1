import { HttpException, HttpStatus } from '@nestjs/common'

export class InvalidNumberException extends HttpException {
  constructor(message: string) {
    super(
      {
        number: message,
        error: true,
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}
