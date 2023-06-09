import { Logger } from 'pino'
import { v4 } from 'uuid'
import { IPerformer, ParsedContestant } from './types'

export interface ContestantsWithPerformers {
  rawContestants: ParsedContestant[]
  performers: IPerformer[]
}
export default function createGetArtists(logger: Logger) {
  return function (contestants: ParsedContestant[]): ContestantsWithPerformers {
    logger.info('Fetching performers from contestants')
    const performersSet = new Set<string>()
    contestants.forEach((contestant) => performersSet.add(contestant.performer))

    const contestantsWithPerformers = {
      rawContestants: contestants,
      performers: Array.from(performersSet).map((performer) => ({
        id: v4(),
        name: performer
      }))
    }

    logger.debug(
      `Performers fetched: ${contestantsWithPerformers.performers.length}`
    )
    return contestantsWithPerformers
  }
}
