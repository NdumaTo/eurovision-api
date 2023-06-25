import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Database } from 'src/database/database'

@Injectable()
export class CountriesService {
  private readonly logger = new Logger(CountriesService.name)
  constructor(private readonly database: Database) {}

  getCountries(skip = 0, limit = 100) {
    this.logger.log({ skip, limit }, 'Getting countries')

    const countries = this.database.countries.slice(skip, skip + limit)

    if (!countries.length) {
      this.logger.warn({ skip, limit }, 'No countries found')
      throw new NotFoundException('No countries found')
    }

    return { total: this.database.countries.length, data: countries }
  }

  getCountryByID(id: string) {
    this.logger.log({ id }, 'Getting country by ID')
    const country = this.database.countries.find((country) => country.id === id)

    if (!country) {
      this.logger.warn({ id }, 'Country not found')
      throw new NotFoundException(`Country with ID ${id} }not found`)
    }

    return country
  }
}
