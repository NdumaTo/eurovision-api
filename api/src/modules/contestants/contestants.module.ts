import { Module } from '@nestjs/common'
import { Database } from 'src/database/database'
import { ContestantsController } from './contestants.controller'
import { ContestantsService } from './contestants.service'

@Module({
  providers: [ContestantsService, Database],
  controllers: [ContestantsController]
})
export class ContestantsModule {}
