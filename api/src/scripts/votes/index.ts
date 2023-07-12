import { parse } from 'csv-parse'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import pino from 'pino'
import { v4 } from 'uuid'
import { ContestRound } from './types'

export interface IVote {
  id: string
  year: number
  round: ContestRound
  fromCountry: string
  toCountry: string
  juryPoints: number
  telePoints: number
}

const pinoOptions: pino.LoggerOptions = {
  name: 'update-seed',
  transport: { target: 'pino-pretty' },
  level: 'debug'
}

const logger = pino(pinoOptions)

async function parseVotes() {
  const seedDataFilePath = join(
    __dirname,
    '..',
    '..',
    'assets',
    'seed-data-with-relations.json'
  )

  const seedData = JSON.parse(readFileSync(seedDataFilePath).toString())

  const votesFile = join(__dirname, '..', '..', 'assets', 'votes.csv')

  const votesPromise = new Promise<any[]>((resolve, reject) => {
    let parsedData: any[] = []
    const file = readFileSync(votesFile).toString()

    const fileParser = parse()
    fileParser.on('readable', () => {
      let datum
      while ((datum = fileParser.read()) !== null) {
        parsedData.push(datum)
      }
    })

    fileParser.on('error', (err) => {
      reject(err)
    })

    fileParser.on('end', () => {
      const dataHeaders = parsedData.shift()
      parsedData = parsedData.map((vote) => {
        const dataObj = {}
        dataHeaders.forEach((header, index) => {
          dataObj[header] = vote[index]
        })
        return dataObj
      })

      resolve(parsedData as unknown as IVote[])
    })

    fileParser.write(file)
    fileParser.end()
  })

  const votes = await votesPromise
  const votesWithCountries = votes.map((vote): IVote => {
    let telePoints: number
    let juryPoints: number

    const fromCountry = seedData.countries.find((country) => {
      return country.id.toLowerCase() === vote.from_country_id
    })
    if (!fromCountry) {
      logger.error({ vote }, 'Could not find from country')
      throw new Error('Could not find from country')
    }

    const toCountry = seedData.countries.find(
      (country) => country.id.toLowerCase() === vote.to_country_id
    )
    if (!fromCountry) {
      logger.error({ vote }, 'Could not find from country')
      throw new Error('Could not find from country')
    }

    if (!vote.tele_points && !vote.jury_points) {
      juryPoints = parseInt(vote.total_points)
      telePoints = 0
    } else {
      juryPoints = parseInt(vote.jury_points)
      telePoints = parseInt(vote.tele_points)
    }

    const returnVote: IVote = {
      id: v4(),
      year: parseInt(vote.year),
      round: vote.round as ContestRound,
      fromCountry: fromCountry.id,
      toCountry: toCountry.id,
      juryPoints,
      telePoints
    }

    return returnVote
  })

  logger.info(`Finished processing votes, ${votesWithCountries.length} votes`)
  logger.info('Writing votes to file')

  writeFileSync(
    join(__dirname, '..', '..', 'assets', 'votes.json'),
    JSON.stringify(votesWithCountries, null, 2)
  )
}

parseVotes()
