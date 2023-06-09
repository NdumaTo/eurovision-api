import { readFileSync } from 'fs'
import { parse } from 'csv-parse'
import pino from 'pino'

export default function createParseCSV<T>(
  filePath: string,
  baseLogger: pino.Logger
) {
  const logger = baseLogger.child({ name: 'parse-csv' })

  return () => {
    return new Promise<T[]>((resolve, reject) => {
      let parsedData: any[] = []
      logger.info(`Reading contestants csv at: ${filePath}`)
      const file = readFileSync(filePath).toString()

      const fileParser = parse()
      fileParser.on('readable', () => {
        let datum
        while ((datum = fileParser.read()) !== null) {
          parsedData.push(datum)
        }
      })

      fileParser.on('error', (err) => {
        logger.error({ err }, 'Error parsing votes csv')
        reject(err)
      })

      fileParser.on('end', () => {
        logger.info('Finished parsing csv')

        const dataHeaders = parsedData.shift()
        parsedData = parsedData.map((vote) => {
          const dataObj = {}
          dataHeaders.forEach((header, index) => {
            dataObj[header] = vote[index]
          })
          return dataObj
        })

        logger.info('Finished parsing votes csv')
        resolve(parsedData as unknown as T[])
      })

      fileParser.write(file)
      fileParser.end()
    })
  }
}
