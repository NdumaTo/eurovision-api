import { ApiProperty } from '@nestjs/swagger'
import { isArray } from 'lodash'
import { SkipAndLimitDto } from 'src/types/skip-and-limit.dto'

export class ContestantsQueryParamsDto extends SkipAndLimitDto {}

export class ContestantResultDto {
  @ApiProperty({
    example: '5f7f9b4a-6b9a-4b0a-8b1a-3b1b1b1b1b1b',
    description: 'Unique identifier of the contestant',
    format: 'uuid'
  })
  id: string

  @ApiProperty({
    example: 2019,
    description: 'Year of the contest',
    format: 'int32'
  })
  year: number

  @ApiProperty({
    example: 'NL',
    description: 'Country of the contestant',
    pattern: '^[a-zA-Z]{2}$'
  })
  country: string

  @ApiProperty({
    example: '021c993c-9414-499c-aa72-bd6bb344a983',
    description: 'Unique identifier of the song submitted by the contestant',
    format: 'uuid'
  })
  song: string

  @ApiProperty({
    example: 'a625a0e9-c3d0-4677-a5cb-fb3cf000860a',
    description: 'Unique identifier of the song performer',
    format: 'uuid'
  })
  performers: string

  @ApiProperty({
    example: 1,
    description: 'Place in the final',
    format: 'int32'
  })
  place: number

  @ApiProperty({
    example: 1,
    description: 'Which Semi Final the contestant participated in',
    enum: [null, 1, 2]
  })
  semiFinalNumber: number

  @ApiProperty({
    example: 1,
    description: 'Running order in the final',
    format: 'int32'
  })
  runningOrderFinal: number

  @ApiProperty({
    example: 1,
    description: 'Running order in the semi final',
    format: 'int32'
  })
  runningOrderSemiFinal: number

  @ApiProperty({
    example: 12,
    description: 'Total number of points in the final',
    format: 'int32'
  })
  pointsFinal: number

  @ApiProperty({
    example: 12,
    description: 'Total number of points in the semi final',
    format: 'int32'
  })
  pointsSemiFinal: number

  @ApiProperty({
    example: 12,
    description: 'Number of points awarded by the public in the final',
    format: 'int32'
  })
  pointsTeleFinal: number

  @ApiProperty({
    example: 12,
    description: 'Number of points awarded by the jury in the final',
    format: 'int32'
  })
  pointsJuryFinal: number

  @ApiProperty({
    example: 12,
    description: 'Number of points awarded by the public in the semi final',
    format: 'int32'
  })
  pointsTeleSemiFinal: number

  @ApiProperty({
    example: 12,
    description: 'Number of points awarded by the jury in the semi final',
    format: 'int32'
  })
  pointsJurySemiFinal: number
}

export class ContestantsResponseDto {
  @ApiProperty({
    example: 10,
    description: 'Total number of contestants',
    format: 'int32'
  })
  total: number

  @ApiProperty({
    description: 'List of contestants',
    type: ContestantResultDto,
    isArray: true
  })
  data: ContestantResultDto[]
}
