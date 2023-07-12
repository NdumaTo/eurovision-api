import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import {
  CountriesQueryParamsDto,
  CountriesResponseDto,
  CountryResultDto
} from './countries.dto'
import { CountriesService } from './countries.service'

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
  @ApiResponse({
    status: 200,
    description: 'The countries that have been successfully retrieved.',
    type: CountriesResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'The countries could not be found.'
  })
  @ApiOperation({
    operationId: 'Get Countries'
  })
  getCountries(
    @Query(new DefaultValuePipe({ skip: 0, limit: 100 }))
    params: CountriesQueryParamsDto
  ) {
    const { skip, limit } = params

    return this.countryService.getCountries(skip, limit)
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the country to retrieve.'
  })
  @ApiResponse({
    status: 200,
    description: 'The country that have been successfully retrieved.',
    type: CountryResultDto
  })
  @ApiResponse({
    status: 404,
    description: 'The country could not be found.'
  })
  @ApiOperation({
    operationId: 'Get Country By ID'
  })
  getCountryByID(@Param('id') id: string) {
    return this.countryService.getCountryByID(id)
  }
}
