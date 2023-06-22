import { Injectable, Logger } from '@nestjs/common'
import { Database } from 'src/database/database'

@Injectable()
export class CountriesService {
  private readonly logger = new Logger(CountriesService.name)
  constructor(private readonly database: Database) {}

  getCountries(skip = 0, limit = 100) {
    return this.database.countries.slice(skip, skip + limit)
  }

  getCountryByID(id: string) {
    this.logger.log({ id }, 'Getting country by ID')
    return this.database.countries.find((country) => country.id === id)
  }
}
