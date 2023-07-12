import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { v4 } from 'uuid'
import { AppService } from './app.service'
import { ConfigService } from './config/config.service'
import { Database } from './database/database'
import { DatabaseModule } from './database/database.module'
import { ContestantsModule } from './modules/contestants/contestants.module'
import { ContestsModule } from './modules/contests/contests.module'
import { CountriesModule } from './modules/countries/countries.module'
import { PerformersModule } from './modules/performers/performers.module'
import { SongsModule } from './modules/songs/songs.module'
import { VotesModule } from './modules/votes/votes.module'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: [
        {
          genReqId: () => v4(),
          level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
          transport:
            process.env.NODE_ENV !== 'production'
              ? { target: 'pino-pretty' }
              : undefined
        },
        process.stdout
      ]
    }),
    DatabaseModule,
    VotesModule,
    SongsModule,
    PerformersModule,
    CountriesModule,
    ContestantsModule,
    ContestsModule
  ],
  controllers: [],
  providers: [AppService, Database, ConfigService]
})
export class AppModule {}
