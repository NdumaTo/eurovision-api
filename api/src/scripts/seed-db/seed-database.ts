import { join } from 'path'
import pino from 'pino'
import createParseCSV from './parse-csv'
import { ParsedContestant } from './types'
import createGetPerformers from './get-performers'
import createGetSongs from './get-songs'
import createGetCountries from './get-countries'
import createGetContestants from './get-contestants'
import { writeFileSync } from 'fs'

async function seedDatabase() {
  const pinoOptions: pino.LoggerOptions = {
    name: 'seed-database',
    transport: { target: 'pino-pretty' },
    level: 'debug'
  }

  const logger = pino(pinoOptions)

  const parseCsv = createParseCSV<ParsedContestant>(
    join(__dirname, '..', '..', 'assets', 'contestants.csv'),
    logger
  )
  const getPerformers = createGetPerformers(logger)
  const getSongs = createGetSongs(logger)
  const getCountries = createGetCountries(logger)
  const getContestants = createGetContestants(logger)

  const parsedCSV = await parseCsv()
  const contestantsWithPerformers = getPerformers(parsedCSV)
  const contestantsWithSongs = getSongs(contestantsWithPerformers)
  const contestantsWithCountries = getCountries(contestantsWithSongs)
  const contestantsWithContestants = getContestants(contestantsWithCountries)

  logger.info('Saving contents to json files')
  const contestantsPath = join(
    __dirname,
    '..',
    '..',
    'assets',
    'seed-data.json'
  )

  const contestantsWithLyricsNormalised =
    contestantsWithContestants.rawContestants.map((contestant) => {
      const lyrics = contestant.lyrics.replace(/\\n/g, '\n')
      return {
        ...contestant,
        lyrics
      }
    })

  writeFileSync(
    contestantsPath,
    JSON.stringify(
      {
        ...contestantsWithContestants,
        rawContestants: contestantsWithLyricsNormalised
      },
      null,
      2
    )
  )
}

seedDatabase()
