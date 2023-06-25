import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Database } from 'src/database/database'

@Injectable()
export class SongsService {
  private readonly logger = new Logger(SongsService.name)
  constructor(private readonly database: Database) {}

  getSongs(skip = 0, limit = 100) {
    this.logger.log({ skip, limit }, 'Getting songs')

    const songs = this.database.songs.slice(skip, skip + limit)

    if (!songs.length) {
      this.logger.warn({ skip, limit }, 'No songs found')
      throw new NotFoundException('No songs found')
    }
    return { total: this.database.songs.length, data: songs }
  }

  getSongByID(id: string) {
    this.logger.log({ id }, 'Getting song by ID')
    const song = this.database.songs.find((song) => song.id === id)

    if (!song) {
      this.logger.warn({ id }, 'Song not found')
      throw new NotFoundException(`Song with ID ${id} }not found`)
    }

    return song
  }
}
