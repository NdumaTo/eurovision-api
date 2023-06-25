import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Database } from 'src/database/database'

@Injectable()
export class ContestantsService {
  private readonly logger = new Logger(ContestantsService.name)
  constructor(private readonly database: Database) {}

  getContestants(skip = 0, limit = 100) {
    this.logger.log({ skip, limit }, 'Getting contestants')

    const contestants = this.database.contestants.slice(skip, skip + limit)

    if (!contestants.length) {
      this.logger.warn({ skip, limit }, 'No contestants found')
      throw new NotFoundException('No contestants found')
    }

    return { total: this.database.contestants.length, data: contestants }
  }

  getContestantByID(id: string) {
    this.logger.log({ id }, 'Getting contestant by ID')

    const contestant = this.database.contestants.find(
      (contestant) => contestant.id === id
    )

    if (!contestant) {
      this.logger.warn({ id }, 'Contestant not found')
      throw new NotFoundException(`Contestant with ID ${id} }not found`)
    }

    return contestant
  }
}
