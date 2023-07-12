import { ApiProperty } from '@nestjs/swagger'
import { ContestRound } from 'src/scripts/votes/types'
import { SkipAndLimitDto } from 'src/types/skip-and-limit.dto'

export class VotesQueryParamsDto extends SkipAndLimitDto {}

export class VoteResultDto {
  @ApiProperty({
    example: '5f7f9b4a-6b9a-4b0a-8b1a-3b1b1b1b1b1b',
    description: 'Unique identifier of the vote',
    format: 'uuid'
  })
  public id: string

  @ApiProperty({
    example: 2019,
    description: 'Year of the contest',
    format: 'int32'
  })
  public year: number

  @ApiProperty({
    example: ContestRound.SEMI_FINAL_1,
    description: 'Round of the contest',
    enum: ContestRound
  })
  public round: ContestRound

  @ApiProperty({
    example: 'GB',
    description: 'Country from which the vote was cast',
    pattern: '^[a-zA-Z]{2}$'
  })
  public fromCountry: string

  @ApiProperty({
    example: 'NL',
    description: 'Country to which the vote was cast',
    pattern: '^[a-zA-Z]{2}$'
  })
  public toCountry: string

  @ApiProperty({
    example: 12,
    description: 'Number of points awarded by the jury',
    format: 'int32'
  })
  public juryPoints: number

  @ApiProperty({
    example: 10,
    description: 'Number of points awarded by the public',
    format: 'int32'
  })
  public telePoints: number
}

export class VotesResponseDto {
  @ApiProperty({
    example: 10,
    description: 'Total number of votes',
    format: 'int32'
  })
  public total: number

  @ApiProperty({
    isArray: true,
    type: VoteResultDto,
    description: 'List of votes'
  })
  public data: VoteResultDto[]
}
