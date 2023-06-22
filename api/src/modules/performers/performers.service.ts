import { Injectable, Logger } from '@nestjs/common'
import { Database } from 'src/database/database'

@Injectable()
export class PerformersService {
  private readonly logger = new Logger(PerformersService.name)
  constructor(private readonly database: Database) {}

  getPerformers(skip = 0, limit = 100) {
    return this.database.performers.slice(skip, skip + limit)
  }

  getPerformerByID(id: string) {
    this.logger.log({ id }, 'Getting performer by ID')
    return this.database.performers.find((performer) => performer.id === id)
  }
}
