import {
  Controller,
  Get,
  Param,
  Query,
  ValidationPipe,
  DefaultValuePipe,
  UsePipes
} from '@nestjs/common'
import { VotesService } from './votes.service'
import { VotesQueryParamsDto } from './votes.dto'

@Controller('votes')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true }
  })
)
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Get()
  getVotes(
    @Query(new DefaultValuePipe({ skip: 0, limit: 100 }))
    params: VotesQueryParamsDto
  ) {
    const { skip, limit } = params
    return this.votesService.getVotes(skip, limit)
  }

  @Get(':id')
  getVoteByID(@Param('id') id: string) {
    return this.votesService.getVoteByID(id)
  }
}
