import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { catchError, firstValueFrom, map } from 'rxjs'
import { NumberPayload } from './app.interface'
import { InvalidNumberException } from './exceptions/index.exception'
import { digitSum } from './lib/digit-sum'
import { armstrongNumber } from './lib/is-armstrong'
import { isPerfectNumber } from './lib/is-perfect-number'
import { isPrime } from './lib/is-prime'

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  private async fetchFunFact(value: number) {
    const apiUrl = this.configService.get<string>('NUMBER_API_URL')

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${apiUrl}/${value}/math`).pipe(
          map((response) => response.data),
          catchError((error) => {
            throw new InvalidNumberException(error)
          }),
        ),
      )
      return response
    } catch (error) {
      throw error
    }
  }

  private calculateNumberProperties(
    value: number,
  ): Omit<NumberPayload, 'fun_fact'> {
    const isEven = value % 2 === 0 ? 'even' : 'odd'
    const isArmstrongNumber = armstrongNumber(value)
    const properties = isArmstrongNumber ? ['armstrong', isEven] : [isEven]

    return {
      number: value,
      is_prime: isPrime(value),
      is_perfect: isPerfectNumber(value),
      properties,
      digit_sum: digitSum(value),
    }
  }

  async fetchClassification(value: number): Promise<NumberPayload> {
    try {
      const numberProperties = this.calculateNumberProperties(value)
      const response = await this.fetchFunFact(value)
      return { ...numberProperties, fun_fact: response }
    } catch {
      throw new InvalidNumberException(value.toString())
    }
  }
}
