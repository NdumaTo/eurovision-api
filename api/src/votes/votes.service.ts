import { Injectable } from '@nestjs/common'
import { Database } from 'src/database/database'

@Injectable()
export class VotesService {
  constructor(private readonly database: Database) {}

  getVotes() {
    return this.database.votes.slice(0, 100)
  }

  getVoteByID(id: string) {
    console.log('id', id)
    return this.database.votes.find((vote) => vote.id === id)
  }
}
