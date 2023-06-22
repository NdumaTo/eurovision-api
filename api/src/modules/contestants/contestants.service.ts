import { Injectable, Logger } from '@nestjs/common'
import { Database } from 'src/database/database'

@Injectable()
export class ContestantsService {
  private readonly logger = new Logger(ContestantsService.name)
  constructor(private readonly database: Database) {}

  getContestants(skip = 0, limit = 100) {
    return this.database.contestants.slice(skip, skip + limit)
  }

  getContestantByID(id: string) {
    this.logger.log({ id }, 'Getting contestant by ID')
    return this.database.contestants.find((contestant) => contestant.id === id)
  }
}
