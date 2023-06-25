import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Database } from 'src/database/database'

@Injectable()
export class PerformersService {
  private readonly logger = new Logger(PerformersService.name)
  constructor(private readonly database: Database) {}

  getPerformers(skip = 0, limit = 100) {
    this.logger.log({ skip, limit }, 'Getting performers')

    const performers = this.database.performers.slice(skip, skip + limit)

    if (!performers.length) {
      this.logger.warn({ skip, limit }, 'No performers found')
      throw new NotFoundException('No performers found')
    }

    return {
      total: this.database.performers.length,
      data: this.database.performers.slice(skip, skip + limit)
    }
  }

  getPerformerByID(id: string) {
    this.logger.log({ id }, 'Getting performer by ID')
    const performer = this.database.performers.find(
      (performer) => performer.id === id
    )

    if (!performer) {
      this.logger.warn({ id }, 'Performer not found')
      throw new NotFoundException(`Performer with ID ${id} }not found`)
    }

    return performer
  }
}
