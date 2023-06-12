import { join } from 'path'
import pino from 'pino'
import { readFileSync } from 'fs'
import { parse } from 'csv-parse'

export interface IVote {
  id: string
  year: number
  round: ContestRound
  fromCountry: string
  toCountry: string
  juryPoints: number
  telePoints: number
}

export enum ContestRound {
  FINAL = 'final',
  SEMI_Final = 'semi-final',
  SEMI_FINAL_1 = 'semi-final-1',
  SEMI_FINAL_2 = 'semi-final-2'
}
