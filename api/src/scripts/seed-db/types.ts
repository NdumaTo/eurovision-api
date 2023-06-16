import { IVote } from '../votes'

export interface ParsedContestant {
  year: string
  to_country_id: string // country id of contestant icontestant.country
  to_country: string // country name of contestant
  performer: string // name of performer
  song: string // name of song
  place_contest: string // place in contest
  sf_num: string // semi final number (1 or 2)
  running_final: string // running order in final
  running_sf: string // running order in semi final
  place_final: string // place in final
  points_final: string // points in final
  place_sf: string // place in semi final
  points_sf: string // points in semi final
  points_tele_final: string // points from televote in final
  points_jury_final: string // points from jury in final if applicable
  points_tele_sf: string // points from televote in semi final if applicable
  points_jury_sf: string // points from jury in semi final if applicable
  composers: string
  lyricists: string
  lyrics: string
  youtube_url: string
}

export interface IContestant {
  id: string
  year: number
  country: string
  song: string
  performer: string
  place: number
  semiFinalNumber: number
  runningOrderFinal: number
  runningOrderSemiFinal: number
  pointsFinal: number
  pointsSemiFinal: number
  pointsTeleFinal: number
  pointsJuryFinal: number
  pointsTeleSemiFinal: number
  pointsJurySemiFinal: number
}

export interface ParsedVote {
  year: string
  round: string
  from_country_id: string
  to_country_id: string
  from_country: string
  to_country: string
  total_points: string
  tele_points: string
  jury_points: string
}

export interface IContest {
  id: string
  year: number
  // hostCountry: string
  // hostCity: string
  // venue: string
  // date: string
  // logoUrl: string
  semiFinals: 0 | 1 | 2
  winnerOnly: boolean
  contestants: string[]
  votes: string[]
}

export interface ICountry {
  id: string
  name: string
}

export interface IPerformer {
  id: string
  name: string
  // country: string
}

export interface ISong {
  id: string
  name: string
  lyrics: string
  composers: string[]
  lyricists: string[]
  performers: string[]
  country: string
  year: number
  youtubeUrl: string
}

export interface DatabaseData {
  countries: ICountry[]
  performers: IPerformer[]
  songs: ISong[]
  contests: IContest[]
  contestants: IContestant[]
  votes: IVote[]
}
