import { Module } from '@nestjs/common'
import { Database } from 'src/database/database'
import { CountriesController } from './countries.controller'
import { CountriesService } from './countries.service'

@Module({
  providers: [CountriesService, Database],
  controllers: [CountriesController]
})
export class CountriesModule {}
