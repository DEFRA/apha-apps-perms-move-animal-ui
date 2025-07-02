import { readdir, access } from 'fs/promises'
import { join } from 'path'

export default function (plop) {
  plop.setGenerator('Question page', {
    description: 'This will create a question page',
    prompts: [
      {
        type: 'list',
        name: 'journey',
        message: 'Journey type',
        choices: ['tb', 'exotics']
      },
      {
        type: 'list',
        name: 'sectionKey',
        message: 'Section key',
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

          return sectionKeys.length > 0 ? sectionKeys : ['about']
        }
      },
      {
        type: 'input',
        name: 'questionKey',
        message: 'Question key (eg. cphNumber)'
      },
      {
        type: 'input',
        name: 'question',
        message: 'Question text?'
      },
      {
        type: 'list',
        name: 'questionType',
        message: 'Question type',
        choices: ['text', 'text-area', 'radio', 'checkbox']
      },
      {
        type: 'input',
        name: 'path',
        message: 'Page URL'
      },
      {
        type: 'input',
        name: 'className',
        message: 'What is the base of the class name(s)?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/server/{{camelCase journey}}/{{sectionKey}}/{{kebabCase className}}/index.js',
        templateFile: 'templates/question-page/index.js.hbs'
      },
      {
        type: 'add',
        path: 'src/server/{{camelCase journey}}/{{sectionKey}}/{{kebabCase className}}/index.test.js',
        templateFile: 'templates/question-page/index.test.js.hbs'
      }
    ]
  })
}
