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
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import {
  PerformerResultDto,
  PerformersQueryParamsDto,
  PerformersResponseDto
} from './performers.dto'
import { PerformersService } from './performers.service'

@Controller('performers')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true }
  })
)
export class PerformersController {
  constructor(private readonly performerService: PerformersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The performers that have been successfully retrieved.',
    type: PerformersResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'The performers could not be found.'
  })
  @ApiOperation({
    operationId: 'Get Performers'
  })
  getPerformers(
    @Query(new DefaultValuePipe({ skip: 0, limit: 100 }))
    params: PerformersQueryParamsDto
  ) {
    const { skip, limit } = params

    return this.performerService.getPerformers(skip, limit)
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the performer to retrieve.',
    format: 'uuid'
  })
  @ApiResponse({
    status: 200,
    description: 'The performer that have been successfully retrieved.',
    type: PerformerResultDto
  })
  @ApiResponse({
    status: 404,
    description: 'The performer could not be found.'
  })
  @ApiOperation({
    operationId: 'Get Performer By ID'
  })
  getPerformerByID(@Param('id', ParseUUIDPipe) id: string) {
    return this.performerService.getPerformerByID(id)
  }
}
