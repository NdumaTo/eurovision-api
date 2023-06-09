import { Logger } from 'pino'
import { ContestantsWithCountries } from './get-countries'
import { IContestant, ICountry } from './types'
import { v4 } from 'uuid'

export interface ContestantsWithContestants extends ContestantsWithCountries {
  contestants: IContestant[]
}

export default function createGetContestants(logger: Logger) {
  return function (contestantsWithCountries: ContestantsWithCountries) {
    logger.info('Fetching songs from contestants')
    const contestants = contestantsWithCountries.rawContestants.map(
      (contestant): IContestant => ({
        id: v4(),
        year: parseInt(contestant.year),
        country: contestant.to_country,
        song: contestant.song,
        performer: contestant.performer,
        place: contestant.place_contest
          ? parseInt(contestant.place_contest)
          : null,
        semiFinalNumber: contestant.sf_num ? parseInt(contestant.sf_num) : null,
        runningOrderFinal: contestant.running_final
          ? parseInt(contestant.running_final)
          : null,
        runningOrderSemiFinal: contestant.running_sf
          ? parseInt(contestant.running_sf)
          : null,
        pointsFinal: contestant.points_final
          ? parseInt(contestant.points_final)
          : null,
        pointsSemiFinal: contestant.points_sf
          ? parseInt(contestant.points_sf)
          : null,
        pointsTeleFinal: contestant.points_tele_final
          ? parseInt(contestant.points_tele_final)
          : null,
        pointsJuryFinal: contestant.points_jury_final
          ? parseInt(contestant.points_jury_final)
          : null,
        pointsTeleSemiFinal: contestant.points_tele_sf
          ? parseInt(contestant.points_tele_sf)
          : null,
        pointsJurySemiFinal: contestant.points_jury_sf
          ? parseInt(contestant.points_jury_sf)
          : null
      })
    )

    logger.debug(`Contestants fetched: ${contestants.length}`)

    return { ...contestantsWithCountries, contestants }
  }
}
