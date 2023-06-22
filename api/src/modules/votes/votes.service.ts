import { Injectable, Logger } from '@nestjs/common'
import { Database } from 'src/database/database'

@Injectable()
export class VotesService {
  private readonly logger = new Logger(VotesService.name)
  constructor(private readonly database: Database) {}

  getVotes(skip = 0, limit = 100) {
    this.logger.log({ skip, limit }, 'Getting votes')
    return this.database.votes.slice(skip, skip + limit)
  }

  getVoteByID(id: string) {
    this.logger.log({ id }, 'Getting vote by ID')
    return this.database.votes.find((vote) => vote.id === id)
  }
}
