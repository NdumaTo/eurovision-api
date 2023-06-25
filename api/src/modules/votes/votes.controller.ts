import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ApiParam, ApiResponse } from '@nestjs/swagger'
import {
  VoteResultDto,
  VotesQueryParamsDto,
  VotesResponseDto
} from './votes.dto'
import { VotesService } from './votes.service'

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
  @ApiResponse({
    status: 200,
    description: 'The votes that have been successfully retrieved.',
    type: VotesResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'The votes could not be found.'
  })
  getVotes(
    @Query(new DefaultValuePipe({ skip: 0, limit: 100 }))
    params: VotesQueryParamsDto
  ): VotesResponseDto {
    const { skip, limit } = params
    return this.votesService.getVotes(
      skip,
      limit
    ) as unknown as VotesResponseDto
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the vote to retrieve.',
    format: 'uuid'
  })
  @ApiResponse({
    status: 200,
    description: 'The vote that have been successfully retrieved.',
    type: VoteResultDto
  })
  @ApiResponse({
    status: 404,
    description: 'The vote could not be found.'
  })
  getVoteByID(@Param('id', ParseUUIDPipe) id: string): VoteResultDto {
    return this.votesService.getVoteByID(id)
  }
}
