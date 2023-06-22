import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ContestantsQueryParamsDto } from './contestants.dto'
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
  getContestants(
    @Query(new DefaultValuePipe({ skip: 0, limit: 100 }))
    params: ContestantsQueryParamsDto
  ) {
    const { skip, limit } = params

    return this.contestantService.getContestants(skip, limit)
  }

  @Get(':id')
  getContestantByID(@Param('id') id: string) {
    return this.contestantService.getContestantByID(id)
  }
}
