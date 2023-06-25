import { ApiProperty } from '@nestjs/swagger'
import { SkipAndLimitDto } from 'src/types/skip-and-limit.dto'

export class ContestsQueryParamsDto extends SkipAndLimitDto {}

export class ContestResultDto {
  @ApiProperty({
    example: '5f7f9b4a-6b9a-4b0a-8b1a-3b1b1b1b1b1b',
    description: 'Unique identifier of the contest',
    format: 'uuid'
  })
  public id: string

  @ApiProperty({
    example: 2019,
    description: 'Year of the contest',
    format: 'int32'
  })
  public year: number
  // hostCountry: string
  // hostCity: string
  // venue: string
  // date: string
  // logoUrl: string

  @ApiProperty({
    example: 2,
    description: 'Number of semi-finals the contest had',
    enum: [0, 1, 2]
  })
  public semiFinals: 0 | 1 | 2

  @ApiProperty({
    example: false,
    description:
      'Whether only the winner was announced. Only applicable to the 1956 contest',
    format: 'boolean'
  })
  public winnerOnly: boolean

  @ApiProperty({
    example: [
      '0c168d45-048d-4c34-9c3f-990d8ae80ce2',
      'eaa9ad72-63a7-44d2-81c1-2e9976911356'
    ],
    description: 'List of contestants that participated in the contest',
    format: 'uuid',
    isArray: true
  })
  public contestants: string[]

  @ApiProperty({
    example: [
      '6eb84690-436f-4285-96cd-a125d1347221',
      '6dd41ba3-74bd-46e7-acc6-ebcce9c4eff2'
    ],
    description: 'List of votes cast in the contest',
    format: 'uuid',
    isArray: true
  })
  public votes: string[]
}

export class ContestsResponseDto {
  @ApiProperty({
    example: 10,
    description: 'Total number of contests',
    format: 'int32'
  })
  public total: number

  @ApiProperty({
    isArray: true,
    type: ContestResultDto,
    description: 'List of contests'
  })
  public data: ContestResultDto[]
}
