import { Logger } from 'pino'
import { ContestantsWithSongs } from './get-songs'
import { ICountry } from './types'

export interface ContestantsWithCountries extends ContestantsWithSongs {
  countries: ICountry[]
}

export default function createGetCountries(logger: Logger) {
  return function (
    contestantsWithSongs: ContestantsWithSongs
  ): ContestantsWithCountries {
    logger.info('Fetching songs from contestants')
    const countriesSet = new Set<string>()

    contestantsWithSongs.rawContestants.forEach((contestant) =>
      countriesSet.add(
        JSON.stringify({
          id: contestant.to_country_id.toUpperCase(),
          name: contestant.to_country
        })
      )
    )

    const countries = Array.from(countriesSet)
      .map((country) => JSON.parse(country) as ICountry)
      .sort((a, b) => a.name.localeCompare(b.name))
    logger.debug(`Countries fetched: ${countries.length}`)

    return { ...contestantsWithSongs, countries }
  }
}
