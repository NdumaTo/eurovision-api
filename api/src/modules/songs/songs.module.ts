import { Module } from '@nestjs/common'
import { Database } from 'src/database/database'
import { SongsController } from './songs.controller'
import { SongsService } from './songs.service'

@Module({
  providers: [SongsService, Database],
  controllers: [SongsController]
})
export class SongsModule {}
