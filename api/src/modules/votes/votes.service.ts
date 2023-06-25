import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Database } from 'src/database/database'

@Injectable()
export class VotesService {
  private readonly logger = new Logger(VotesService.name)
  constructor(private readonly database: Database) {}

  getVotes(skip = 0, limit = 100) {
    this.logger.log({ skip, limit }, 'Getting votes')

    const votes = this.database.votes.slice(skip, skip + limit)

    if (!votes.length) {
      this.logger.warn({ skip, limit }, 'No votes found')
      throw new NotFoundException('No votes found')
    }

    return { total: this.database.votes.length, data: votes }
  }

  getVoteByID(id: string) {
    this.logger.log({ id }, 'Getting vote by ID')
    const vote = this.database.votes.find((vote) => vote.id === id)

    if (!vote) {
      this.logger.warn({ id }, 'Vote not found')
      throw new NotFoundException(`Vote with ID ${id} }not found`)
    }

    return vote
  }
}
