import crypto from 'crypto'

const options = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
]

const pick = (options) => {
  return options[Math.floor(crypto.randomInt(0, options.length))]
}

const generateSegment = () => {
  return new Array(4)
    .fill(null)
    .map(() => pick(options))
    .join('')
}

function* applicationReferenceGenerator() {
  while (true) {
    const partOne = generateSegment()
    const partTwo = generateSegment()
    yield `TB-${partOne}-${partTwo}`
  }
}

const referenceGenerator = applicationReferenceGenerator()

const getApplicationReference = () => {
  return referenceGenerator.next().value
}

export { getApplicationReference }
