import { readFileSync, writeFileSync } from 'fs'
import { groupBy, omit } from 'lodash'
import { join } from 'path'
import pino from 'pino'
import { v4 } from 'uuid'

const pinoOptions: pino.LoggerOptions = {
  name: 'update-seed',
  transport: { target: 'pino-pretty' },
  level: 'debug'
}

const logger = pino(pinoOptions)

async function updateSeed() {
  const seedDataPath = join(
    __dirname,
    '..',
    '..',
    'assets',
    'seed-data-with-relations.json'
  )
  const votesPath = join(__dirname, '..', '..', 'assets', 'votes.json')

  const seedData = JSON.parse(readFileSync(seedDataPath).toString())
  const votes = JSON.parse(readFileSync(votesPath).toString())

  const contestantsGroupedByYear = groupBy(seedData.contestants, 'year')
  const votesGroupedByYear = groupBy(votes, 'year')

  const numberOfContestantsYears = Object.keys(contestantsGroupedByYear).length
  const numberOfVotesYears = Object.keys(votesGroupedByYear).length

  logger.info(
    { numberOfContestantsYears, numberOfVotesYears },
    'Number of years'
  )

  const contestYears = Object.keys(contestantsGroupedByYear)

  const newContests = contestYears.map((year) => {
    const votesForYear = votesGroupedByYear[year]
    const contestantsForYear = contestantsGroupedByYear[year]

    return {
      id: v4(),
      year: Number(year),
      winnerOnly: year === '1957',
      contestants: contestantsForYear?.map(({ id }) => id) || [],
      votes: votesForYear?.map(({ id }) => id) || []
    }
  })

  const newSeedData = {
    ...omit(seedData, 'rawContestants'),
    contests: newContests,
    votes
  }

  const newSeedDataPath = join(
    __dirname,
    '..',
    '..',
    'assets',
    'full-seed-data.json'
  )

  logger.info({ newSeedDataPath }, 'Writing new seed data')

  writeFileSync(newSeedDataPath, JSON.stringify(newSeedData, null, 2))
}

updateSeed()
