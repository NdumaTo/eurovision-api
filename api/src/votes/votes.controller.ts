import { Controller, Get, Param } from '@nestjs/common'
import { VotesService } from './votes.service'

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}
  @Get()
  getVotes() {
    return this.votesService.getVotes()
  }

  @Get(':id')
  getVoteByID(@Param('id') id: string) {
    return this.votesService.getVoteByID(id)
  }
}
