import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './exceptions/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new HttpExceptionFilter())
  app.setGlobalPrefix('/api/')
  await app.listen(process.env.PORT ?? 3001)
}
bootstrap()
