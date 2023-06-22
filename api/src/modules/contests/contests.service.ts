import { Injectable, Logger } from '@nestjs/common'
import { Database } from 'src/database/database'

@Injectable()
export class ContestsService {
  private readonly logger = new Logger(ContestsService.name)
  constructor(private readonly database: Database) {}

  getContests(skip = 0, limit = 100) {
    return this.database.contests.slice(skip, skip + limit)
  }

  getContestByID(id: string) {
    this.logger.log({ id }, 'Getting contest by ID')
    return this.database.contests.find((contest) => contest.id === id)
  }
}
