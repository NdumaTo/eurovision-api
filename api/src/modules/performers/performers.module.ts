import { Module } from '@nestjs/common'
import { Database } from 'src/database/database'
import { PerformersController } from './performers.controller'
import { PerformersService } from './performers.service'

@Module({
  providers: [PerformersService, Database],
  controllers: [PerformersController]
})
export class PerformersModule {}
