import { Logger } from 'pino'
import { v4 } from 'uuid'
import { ContestantsWithPerformers } from './get-performers'
import { ISong } from './types'

export interface ContestantsWithSongs extends ContestantsWithPerformers {
  songs: ISong[]
}

export default function createGetSongs(logger: Logger) {
  return function (
    contestantsWithPerformers: ContestantsWithPerformers
  ): ContestantsWithSongs {
    logger.info('Fetching songs from contestants')
    const songs: ISong[] = contestantsWithPerformers.rawContestants.map(
      (contestant) => ({
        id: v4(),
        name: contestant.song,
        lyrics: contestant.lyrics.replace(/\\n/g, '\n'),
        composers: contestant.composers
          .split(',')
          .filter((item) => !!item.trim().length),
        lyricists: contestant.lyricists
          .split(',')
          .filter((item) => !!item.trim().length),
        performers: [contestant.performer],
        country: contestant.to_country,
        year: parseInt(contestant.year),
        youtubeUrl: contestant.youtube_url
      })
    )
    logger.debug(`Songs fetched: ${songs.length}`)
    return { ...contestantsWithPerformers, songs }
  }
}
