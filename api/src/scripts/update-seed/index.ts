import pino from 'pino'
import { join } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { ContestantsWithContestants } from '../seed-db/get-contestants'
import { groupBy } from 'lodash'
import { ICountry, IContest } from '../seed-db/types'
import { v4 } from 'uuid'

const pinoOptions: pino.LoggerOptions = {
  name: 'update-seed',
  transport: { target: 'pino-pretty' },
  level: 'debug'
}

const logger = pino(pinoOptions)

async function updateSeed() {
  const seedDataPath = join(__dirname, '..', '..', 'assets', 'seed-data.json')
  const seedData = readFileSync(seedDataPath).toString()

  logger.info('Parsing seed data')
  const parsedSeedData = JSON.parse(seedData) as ContestantsWithContestants

  const groupedCountries = groupBy(parsedSeedData.countries, 'name')
  logger.info(groupedCountries, `Grouped countries`)

  const groupedCountriesWhereOneIDOfTwo = Object.fromEntries(
    Object.entries(groupedCountries).filter(
      ([, contestants]) =>
        contestants.length === 1 && contestants[0].id.length === 2
    )
  )

  const groupedCountriesWhereMoreThanOneID = Object.fromEntries(
    Object.entries(groupedCountries).filter(
      ([, contestants]) => contestants.length > 1
    )
  )

  // Only Andorra fits here
  const groupedCountriesWhereOneButIDHasLengthOfMoreThanTwo =
    Object.fromEntries(
      Object.entries(groupedCountries).filter(
        ([, contestants]) =>
          contestants.length === 1 && contestants[0].id.length > 2
      )
    )

  // Only Andorra fits here
  const groupedCountriesWhereAllIDsAreLengthOfMoreThanTwo = Object.fromEntries(
    Object.entries(groupedCountries).filter(([, contestants]) =>
      contestants.every((contestant) => contestant.id.length > 2)
    )
  )

  logger.info(groupedCountriesWhereOneIDOfTwo, `Grouped countries where one ID`)

  const newCountries: ICountry[] = [
    ...Object.entries(groupedCountriesWhereOneIDOfTwo).map(
      ([name, [{ id }]]) => ({ id, name })
    ),
    ...Object.entries(groupedCountriesWhereMoreThanOneID).map(
      ([name, countries]) => ({
        id: countries.sort(
          ({ id: idA }, { id: idB }) => idA.length - idB.length
        )[0].id,
        name
      })
    ),
    { id: 'AD', name: 'Andorra' }
  ]

  // logger.info(
  //   groupedCountriesWhereMoreThanOneID,
  //   `Grouped countries where multiple IDs`
  // )

  logger.info(
    groupedCountriesWhereAllIDsAreLengthOfMoreThanTwo,
    `Grouped countries where all IDs are length of more than 2`
  )

  logger.info(
    groupedCountriesWhereOneButIDHasLengthOfMoreThanTwo,
    `Grouped countries where one ID but length of ID is more than 2`
  )

  logger.info(`New countries: ${newCountries.length}`)
  logger.info(`Old countries: ${parsedSeedData.countries.length}`)

  const oldCountryNames = new Set(
    parsedSeedData.countries.map((country) => country.name)
  )
  const newCountyNames = new Set(newCountries.map((country) => country.name))

  logger.info(
    `All Countries accounted for: ${
      oldCountryNames.size === newCountyNames.size
    }`
  )

  parsedSeedData.countries = newCountries

  logger.info(parsedSeedData.countries, `New countries`)

  logger.info('Replacing contestant countries with country IDs')

  const contestantsWithCountryIDs = parsedSeedData.contestants.map(
    (contestant) => {
      const country = parsedSeedData.countries.find(
        (country) => country.name === contestant.country
      )

      if (!country) {
        throw new Error(
          `Country ${contestant.country} not found in new countries`
        )
      }

      return {
        ...contestant,
        country: country.id
      }
    }
  )

  // logger.info(
  //   contestantsWithCountryIDs,
  //   `Contestants with country IDs instead of names`
  // )

  parsedSeedData.contestants = contestantsWithCountryIDs

  const songsWithCountryIDs = parsedSeedData.songs.map((song) => {
    const country = parsedSeedData.countries.find(
      (country) => country.name === song.country
    )

    if (!country) {
      throw new Error(`Country ${song.country} not found in new countries`)
    }

    return {
      ...song,
      country: country.id
    }
  })

  // logger.info(songsWithCountryIDs, `Songs with country IDs instead of names`)
  parsedSeedData.songs = songsWithCountryIDs

  const songsWithPerformerIDs = parsedSeedData.songs.map((song) => {
    const performer = parsedSeedData.performers.find(
      (performer) => performer.name === song.performers[0]
    )

    if (!performer) {
      throw new Error(`Performer ${song.performers[0]} not found in performers`)
    }

    return {
      ...song,
      performers: [performer.id]
    }
  })

  // logger.info(
  //   songsWithPerformerIDs,
  //   `Songs with performer IDs instead of names`
  // )

  parsedSeedData.songs = songsWithPerformerIDs

  const contestantsWithPerformerIDs = parsedSeedData.contestants.map(
    (contestant) => {
      const performer = parsedSeedData.performers.find(
        (performer) => performer.name === contestant.performer
      )

      if (!performer) {
        throw new Error(
          `Performer ${contestant.performer} not found in performers`
        )
      }

      return {
        ...contestant,
        performer: performer.id
      }
    }
  )

  // logger.info(
  //   contestantsWithPerformerIDs,
  //   `Contestants with performer IDs instead of names`
  // )

  parsedSeedData.contestants = contestantsWithPerformerIDs

  const contestantsWithSongIDs = parsedSeedData.contestants.map(
    (contestant) => {
      const song = parsedSeedData.songs.find(
        (song) => song.name === contestant.song
      )

      if (!song) {
        throw new Error(`Song ${contestant.song} not found in songs`)
      }

      return {
        ...contestant,
        song: song.id
      }
    }
  )

  logger.info(
    contestantsWithSongIDs,
    `Contestants with song IDs instead of names`
  )

  parsedSeedData.contestants = contestantsWithSongIDs

  const contestantsGroupedByYear = groupBy(parsedSeedData.contestants, 'year')

  const determineNumberOfSemiFinals = (year: string) => {
    if (year < '2004') {
      return 0
    }

    if (year < '2008') {
      return 1
    }

    return 2
  }

  const contests: IContest[] = Object.entries(contestantsGroupedByYear).map(
    ([year, contestants]) => {
      return {
        id: v4(),
        year: Number(year),
        semiFinals: determineNumberOfSemiFinals(year),
        winnerOnly: year === '1956',
        contestants: contestants.map((contestant) => contestant.id)
      }
    }
  )

  writeFileSync(
    join(__dirname, '..', '../', 'assets', '/seed-data-with-relations.json'),
    JSON.stringify({ ...parsedSeedData, contests }, null, 2)
  )

  logger.info('Seed data updated')
}

updateSeed()
