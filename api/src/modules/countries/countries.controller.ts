import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { CountriesService } from './countries.service'
import { CountriesQueryParamsDto } from './countries.dto'

@Controller('countries')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true }
  })
)
export class CountriesController {
  constructor(private readonly countryService: CountriesService) {}

  @Get()
  getCountries(
    @Query(new DefaultValuePipe({ skip: 0, limit: 100 }))
    params: CountriesQueryParamsDto
  ) {
    const { skip, limit } = params

    return this.countryService.getCountries(skip, limit)
  }

  @Get(':id')
  getCountryByID(@Param('id') id: string) {
    return this.countryService.getCountryByID(id)
  }
}
