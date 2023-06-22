import { Module } from '@nestjs/common'
import { VotesController } from './votes.controller'
import { VotesService } from './votes.service'
import { Database } from 'src/database/database'

@Module({
  controllers: [VotesController],
  providers: [VotesService, Database]
})
export class VotesModule {}
