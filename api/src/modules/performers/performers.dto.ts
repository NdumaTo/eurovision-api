import { ApiProperty } from '@nestjs/swagger'
import { SkipAndLimitDto } from 'src/types/skip-and-limit.dto'

export class PerformersQueryParamsDto extends SkipAndLimitDto {}

export class PerformerResultDto {
  @ApiProperty({
    example: '5f7f9b4a-6b9a-4b0a-8b1a-3b1b1b1b1b1b',
    description: 'Unique identifier of the performer',
    format: 'uuid'
  })
  public id: string

  @ApiProperty({
    example: 'The Beatles',
    description: 'Name of the performer',
    pattern: '^[a-zA-Z0-9 ]+$'
  })
  public name: string
}

export class PerformersResponseDto {
  @ApiProperty({
    example: 10,
    description: 'Total number of performers',
    format: 'int32'
  })
  public total: number

  @ApiProperty({
    isArray: true,
    description: 'List of performers',
    type: PerformerResultDto
  })
  public data: PerformerResultDto[]
}
