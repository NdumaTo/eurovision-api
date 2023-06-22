import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { SongsService } from './songs.service'
import { SongsQueryParamsDto } from './songs.dto'

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
  getSongs(
    @Query(new DefaultValuePipe({ skip: 0, limit: 100 }))
    params: SongsQueryParamsDto
  ) {
    const { skip, limit } = params
    return this.songService.getSongs(skip, limit)
  }

  @Get(':id')
  getSongByID(@Param('id') id: string) {
    return this.songService.getSongByID(id)
  }
}
