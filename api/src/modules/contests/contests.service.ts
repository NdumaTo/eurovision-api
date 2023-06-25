import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Database } from 'src/database/database'

@Injectable()
export class ContestsService {
  private readonly logger = new Logger(ContestsService.name)
  constructor(private readonly database: Database) {}

  getContests(skip = 0, limit = 100) {
    this.logger.log({ skip, limit }, 'Getting contests')

    const contests = this.database.contests.slice(skip, skip + limit)

    if (!contests.length) {
      this.logger.warn({ skip, limit }, 'No contests found')
      throw new NotFoundException('No contests found')
    }

    return { total: this.database.contests.length, data: contests }
  }

  getContestByID(id: string) {
    this.logger.log({ id }, 'Getting contest by ID')
    const contest = this.database.contests.find((contest) => contest.id === id)

    if (!contest) {
      this.logger.warn({ id }, 'Contest not found')
      throw new NotFoundException(`Contest with ID ${id} }not found`)
    }

    return contest
  }
}
