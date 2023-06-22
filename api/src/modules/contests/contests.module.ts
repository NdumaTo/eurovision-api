import { Module } from '@nestjs/common'
import { Database } from 'src/database/database'
import { ContestsController } from './contests.controller'
import { ContestsService } from './contests.service'

@Module({
  providers: [ContestsService, Database],
  controllers: [ContestsController]
})
export class ContestsModule {}
