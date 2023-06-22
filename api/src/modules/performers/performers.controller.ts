import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { PerformersService } from './performers.service'
import { PerformersQueryParamsDto } from './performers.dto'

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
  getPerformers(
    @Query(new DefaultValuePipe({ skip: 0, limit: 100 }))
    params: PerformersQueryParamsDto
  ) {
    const { skip, limit } = params

    return this.performerService.getPerformers(skip, limit)
  }

  @Get(':id')
  getPerformerByID(@Param('id') id: string) {
    return this.performerService.getPerformerByID(id)
  }
}
