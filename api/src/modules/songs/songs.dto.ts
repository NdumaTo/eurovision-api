import { ApiProperty } from '@nestjs/swagger'
import { SkipAndLimitDto } from 'src/types/skip-and-limit.dto'

export class SongsQueryParamsDto extends SkipAndLimitDto {}

export class SongResultDto {
  @ApiProperty({
    example: '5f7f9b4a-6b9a-4b0a-8b1a-3b1b1b1b1b1b',
    description: 'Unique identifier of the vote',
    format: 'uuid'
  })
  public id: string

  @ApiProperty({
    example: 'Refrain',
    description: 'Name of the song'
  })
  public name: string

  @ApiProperty({
    description: 'The song lyrics'
  })
  lyrics: string

  @ApiProperty({
    isArray: true,
    description: 'The song composers'
  })
  public composers: string[]

  @ApiProperty({
    isArray: true,
    description: 'The song composers'
  })
  public lyricists: string[]

  @ApiProperty({
    isArray: true,
    description: 'The IDs of song performers'
  })
  public performers: string[]

  @ApiProperty({
    example: 'NL',
    description: 'Country from which the song was sent',
    pattern: '^[a-zA-Z]{2}$'
  })
  public country: string

  @ApiProperty({
    example: 2019,
    description: 'Year of the contest',
    format: 'int32'
  })
  public year: number

  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=IyqIPvOkiRk',
    format: 'url',
    description: 'URL of the song on YouTube'
  })
  public youtubeUrl: string
}

export class SongsResponseDto {
  @ApiProperty({
    example: 10,
    description: 'Total number of songs'
  })
  public total: number

  @ApiProperty({
    isArray: true,
    description: 'The songs that have been successfully retrieved.',
    type: SongResultDto
  })
  public data: SongResultDto[]
}
