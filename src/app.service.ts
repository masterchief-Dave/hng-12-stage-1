import { BadRequestException, Injectable } from '@nestjs/common'
import { armstrongNumber } from './lib/is-armstrong'
import { digitSum } from './lib/digit-sum'
import { isPerfectNumber } from './lib/is-perfect-number'
import { ConfigService } from '@nestjs/config'
import { isPrime } from './lib/is-prime'
import { NumberPayload } from './app.interface'
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom, map } from 'rxjs'

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
        this.httpService.get(`${apiUrl}/${value}`).pipe(
          map((response) => response.data),
          catchError((error) => {
            console.log(error)
            throw new BadRequestException(error.message)
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
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
