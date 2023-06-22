import { Injectable, Logger } from '@nestjs/common'
import { Database } from 'src/database/database'

@Injectable()
export class SongsService {
  private readonly logger = new Logger(SongsService.name)
  constructor(private readonly database: Database) {}

  getSongs(skip = 0, limit = 100) {
    this.logger.log({ skip, limit }, 'Getting songs')
    return this.database.songs.slice(skip, skip + limit)
  }

  getSongByID(id: string) {
    this.logger.log({ id }, 'Getting song by ID')
    return this.database.songs.find((song) => song.id === id)
  }
}
