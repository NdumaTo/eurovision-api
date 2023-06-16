import { Injectable } from '@nestjs/common'
import { readFileSync } from 'fs'
import { join } from 'path'
import {
  DatabaseData,
  IContest,
  IContestant,
  ICountry,
  IPerformer,
  ISong
} from 'src/scripts/seed-db/types'
import { IVote } from 'src/scripts/votes'

@Injectable()
export class Database {
  readonly contestants: IContestant[]
  readonly votes: IVote[]
  readonly songs: ISong[]
  readonly countries: ICountry[]
  readonly performers: IPerformer[]
  readonly contests: IContest[]

  constructor() {
    const file = readFileSync(
      join(__dirname, '..', 'assets', 'full-seed-data.json')
    )

    const databaseData = JSON.parse(file.toString()) as DatabaseData

    this.votes = databaseData.votes
    this.contestants = databaseData.contestants
    this.songs = databaseData.songs
    this.countries = databaseData.countries
    this.performers = databaseData.performers
    this.contests = databaseData.contests
  }
}
