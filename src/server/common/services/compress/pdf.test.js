import { readFile, writeFile } from 'node:fs/promises'
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { compressPDF } from './pdf.js'

/* global __dirname */
/* eslint-disable jest/valid-title */

/** @param {{ it: string, directoryPrefix: string }} config */
const testFileCompression = ({ it: message, directoryPrefix }) => {
  const folder = resolve(__dirname, `examples/${directoryPrefix}/`)
  const output = resolve(__dirname, `output/${directoryPrefix}/`)
  const files = readdirSync(folder).map((v) => [v])
  const timeoutMs = 10_000

  it.each(files)(
    message,
    async (file) => {
      const buffer = await readFile(resolve(folder, file))
      const compressed = await compressPDF(buffer)
      await writeFile(resolve(output, file), compressed.file)

      expect(compressed.size).toBeLessThan(1_000_000 * 2)
    },
    timeoutMs
  )
}

describe('compressPDF', () => {
  testFileCompression({
    it: 'should successfully compress pdfs with only the biosecurity plan in them: %s',
    directoryPrefix: 'biosecurity'
  })

  testFileCompression({
    it: 'should successfully compress pdfs with the whole application in them: %s',
    directoryPrefix: 'whole-tb24'
  })
})
