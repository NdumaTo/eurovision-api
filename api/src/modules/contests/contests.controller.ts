import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ContestsService } from './contests.service'
import { ContestResultDto, ContestsQueryParamsDto, ContestsResponseDto } from './contests.dto'
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('contests')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true }
  })
)
export class ContestsController {
  constructor(private readonly contestService: ContestsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The contests that have been successfully retrieved.',
    type: ContestsResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'The contests could not be found.'
  })
  @ApiOperation({
    operationId: 'Get Contests'
  })
  getContests(
    @Query(new DefaultValuePipe({ skip: 0, limit: 100 }))
    params: ContestsQueryParamsDto
  ) {
    const { skip, limit } = params

    return this.contestService.getContests(skip, limit)
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the contest to retrieve.',
    format: 'uuid'
  })
  @ApiResponse({
    status: 200,
    description: 'The contest that have been successfully retrieved.',
    type: ContestResultDto
  })
  @ApiResponse({
    status: 404,
    description: 'The contest could not be found.'
  })
  @ApiOperation({
    operationId: 'Get Contest By ID'
  })
  getContestByID(@Param('id') id: string) {
    return this.contestService.getContestByID(id)
  }
}
