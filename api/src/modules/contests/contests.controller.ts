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
import { ContestsQueryParamsDto } from './contests.dto'

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
  getContests(
    @Query(new DefaultValuePipe({ skip: 0, limit: 100 }))
    params: ContestsQueryParamsDto
  ) {
    const { skip, limit } = params

    return this.contestService.getContests(skip, limit)
  }

  @Get(':id')
  getContestByID(@Param('id') id: string) {
    return this.contestService.getContestByID(id)
  }
}
