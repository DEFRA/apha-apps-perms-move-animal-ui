import { readdir, access } from 'fs/promises'
import { join } from 'path'

export default function (plop) {
  plop.setGenerator('Question page', {
    description: 'This will create a question page',
    prompts: [
      {
        type: 'list',
        name: 'questionType',
        message: 'What \x1b[33mtype\x1b[0m of question are you adding?',
        choices: ['text', 'text-area', 'radio-button', 'checkbox']
      },
      {
        type: 'list',
        name: 'journey',
        message: (answers) =>
          `What \x1b[33mjourney\x1b[0m are you adding this ${answers.questionType} question to?`,
        choices: ['tb', 'exotics']
      },
      {
        type: 'list',
        name: 'sectionKey',
        message: (answers) =>
          `What \x1b[33msection\x1b[0m of ${answers.journey} is this question being added to?`,
        choices: async (answers) => {
          const journeyPath = `src/server/${answers.journey}`
          const sections = await readdir(journeyPath, { withFileTypes: true })

          const sectionKeys = []
          for (const section of sections) {
            if (section.isDirectory()) {
              try {
                await access(join(journeyPath, section.name, 'section.js'))
                sectionKeys.push(section.name)
              } catch {
                // section.js doesn't exist, skip this directory
              }
            }
          }

          if (sectionKeys.length === 0) {
            throw new Error(
              `No valid sections found in ${journeyPath}. Please create a section first.`
            )
          }

          return sectionKeys
        }
      },
      {
        type: 'input',
        name: 'questionKey',
        message: 'What is the \x1b[33mquestion key\x1b[0m of the new question?',
        validate: (input) => {
          if (!input || input.trim() === '') {
            return 'Question key cannot be empty.'
          }
          if (!/^[a-zA-Z]+$/.test(input)) {
            return 'Question key must contain only letters.'
          }
          return true
        },
        transform: (input) => input.trim()
      },
      {
        type: 'input',
        name: 'question',
        message:
          'What is the \x1b[33mquestion text\x1b[0m of the new question?',
        validate: (input) => {
          if (!input || input.trim() === '') {
            return 'Question text cannot be empty.'
          }
          return true
        },
        transform: (input) => {
          const trimmed = input.trim()
          const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
          return capitalized.endsWith('?') ? capitalized : `${capitalized}?`
        }
      },
      {
        type: 'input',
        name: 'path',
        message: 'What is the \x1b[33murl path\x1b[0m of the new question?',
        validate: (input) => {
          if (!input || input.trim() === '') {
            return 'URL path cannot be empty.'
          }
          return true
        },
        transform: (input) => {
          const trimmed = input.trim()
          const urlFriendly = trimmed
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-_/]/g, '')
          return urlFriendly.startsWith('/') ? urlFriendly : `/${urlFriendly}`
        }
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/server/{{camelCase journey}}/{{sectionKey}}/{{kebabCase questionKey}}/index.js',
        templateFile: 'templates/question-page/index.js.hbs'
      },
      {
        type: 'add',
        path: 'src/server/{{camelCase journey}}/{{sectionKey}}/{{kebabCase questionKey}}/index.test.js',
        templateFile: 'templates/question-page/index.test.js.hbs'
      },
      '\x1b[41m\x1b[37m\x1b[1m IMPORTANT \x1b[0m',
      "⚠️\tYou will need to manually add it to the section's index.js file.\x1b[0m\t  ⚠️",
      '⚠️\tYou must now fill out the templated areas, search for `//TEMPLATE-TODO`\t  ⚠️'
    ]
  })
}
