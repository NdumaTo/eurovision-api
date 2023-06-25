import { ApiProperty } from '@nestjs/swagger'
import { SkipAndLimitDto } from 'src/types/skip-and-limit.dto'

export class CountriesQueryParamsDto extends SkipAndLimitDto {}

export class CountryResultDto {
  @ApiProperty({
    example: 'NL',
    description: 'Unique identifier of the country'
  })
  public id: string

  @ApiProperty({
    example: 'Netherlands',
    description: 'Name of the country',
    format: 'string'
  })
  public name: string
}

export class CountriesResponseDto {
  @ApiProperty({
    example: 10,
    description: 'Total number of countries',
    format: 'int32'
  })
  public total: number

  @ApiProperty({
    type: CountryResultDto,
    isArray: true,
    description: 'List of countries'
  })
  public data: CountryResultDto[]
}
