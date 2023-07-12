import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ApiOperation, ApiParam, ApiProperty, ApiResponse } from '@nestjs/swagger'
import {
  ContestantResultDto,
  ContestantsQueryParamsDto,
  ContestantsResponseDto
} from './contestants.dto'
import { ContestantsService } from './contestants.service'

@Controller('contestants')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true }
  })
)
export class ContestantsController {
  constructor(private readonly contestantService: ContestantsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The contestants that have been successfully retrieved.',
    type: ContestantsResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'The contestants could not be found.'
  })
  @ApiOperation({
    operationId: 'Get Contestants'
  })
  getContestants(
    @Query(new DefaultValuePipe({ skip: 0, limit: 100 }))
    params: ContestantsQueryParamsDto
  ) {
    const { skip, limit } = params

    return this.contestantService.getContestants(skip, limit)
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the contestant to retrieve.',
    format: 'uuid'
  })
  @ApiOperation({
    operationId: 'Get Contestant By ID'
  })
  @ApiResponse({
    status: 200,
    description: 'The contestant that have been successfully retrieved.',
    type: ContestantResultDto
  })
  @ApiResponse({
    status: 404,
    description: 'The contestant could not be found.'
  })
  getContestantByID(@Param('id') id: string) {
    return this.contestantService.getContestantByID(id)
  }
}
