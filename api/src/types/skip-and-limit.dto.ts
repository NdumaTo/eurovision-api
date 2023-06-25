import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, Max, Min } from 'class-validator'

export class SkipAndLimitDto {
  @ApiProperty({
    description: 'The number of items to skip',
    default: 0,
    minimum: 0
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  public skip: number

  @ApiProperty({
    description: 'The maxiumum number of items to return',
    default: 100,
    minimum: 1,
    maximum: 100
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  public limit: number
}
