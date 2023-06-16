import { NestFactory } from '@nestjs/core'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true
  })

  app.use(helmet())
  app.useLogger(app.get(Logger))

  await app.listen(3000)
}
bootstrap()
