/* eslint-disable n/no-unpublished-import */
import { globSync } from 'glob'
import { writeFileSync } from 'fs'

const group = parseInt(process.argv[2], 10)
const total = parseInt(process.argv[3], 10)

const specs = globSync('test/specs/**/*.js') // Update path if needed
specs.sort() // consistent ordering

const perGroup = Math.ceil(specs.length / total)
const start = (group - 1) * perGroup
const end = start + perGroup

const selected = specs.slice(start, end).join(',')
writeFileSync('specs.txt', selected)
