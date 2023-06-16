import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Database } from './database/database'
import { DatabaseModule } from './database/database.module'
import { SongsModule } from './songs/songs.module'
import { VotesModule } from './votes/votes.module'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: [
        {
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
    SongsModule
  ],
  controllers: [AppController],
  providers: [AppService, Database]
})
export class AppModule {}
