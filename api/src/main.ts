import { NestFactory } from '@nestjs/core'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from './config/config.service'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true
  })

  app.use(helmet())
  app.useLogger(app.get(Logger))

  const apiSpec = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, apiSpec)
  SwaggerModule.setup('api', app, document)

  const config = app.get(ConfigService) as any
  const logger = app.get(Logger)

  await app.listen(config.EUROVISION_API_PORT)

  logger.log(`Application listening on port ${config.EUROVISION_API_PORT}`)
}
bootstrap()
