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
  SongResultDto,
  SongsQueryParamsDto,
  SongsResponseDto
} from './songs.dto'
import { SongsService } from './songs.service'

@Controller('songs')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true }
  })
)
export class SongsController {
  constructor(private readonly songService: SongsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The songs that have been successfully retrieved.',
    type: SongsResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'The songs could not be found.'
  })
  @ApiOperation({
    operationId: 'Get Songs'
  })
  getSongs(
    @Query(new DefaultValuePipe({ skip: 0, limit: 100 }))
    params: SongsQueryParamsDto
  ) {
    const { skip, limit } = params
    return this.songService.getSongs(skip, limit)
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the song to retrieve.',
    format: 'uuid'
  })
  @ApiResponse({
    status: 200,
    description: 'The song that have been successfully retrieved.',
    type: SongResultDto
  })
  @ApiResponse({
    status: 404,
    description: 'The song could not be found.'
  })
  @ApiOperation({
    operationId: 'Get Song By ID'
  })
  getSongByID(@Param('id', ParseUUIDPipe) id: string) {
    return this.songService.getSongByID(id)
  }
}
