import { Injectable, Logger } from '@nestjs/common'
import { config } from 'dotenv'
import { resolve } from 'path'

@Injectable()
export class ConfigService {
  private readonly logger = new Logger('Config Service')

  constructor() {
    const defaultFilePath = resolve(process.cwd(), '.env')
    const dotenvResult = config({
      path: process.env.CONFIG_FILE_PATH || defaultFilePath
    })

    if (dotenvResult.error) {
      this.logger.error(
        dotenvResult.error,
        'Failed to load environment variables'
      )
      process.exit(1)
    }

    Object.assign(this, dotenvResult.parsed)
    this.logger.log('Loaded config')
  }
}
