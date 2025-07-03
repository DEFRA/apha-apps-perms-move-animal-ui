import { execSync } from 'child_process'

import { journeyPrompt } from './prompts/journey-prompt.js'
import { questionKeyPrompt } from './prompts/question-key-prompt.js'
import { questionPrompt } from './prompts/question-prompt.js'
import { questionTypePrompt } from './prompts/question-type-prompt.js'
import { sectionKeyPrompt } from './prompts/section-key-prompt.js'
import { urlPathPrompt } from './prompts/url-path-prompt.js'
import { radioChoicePrompt } from './prompts/radio-button-choices.js'

export default function (plop) {
  plop.setHelper('eq', (a, b) => {
    return a === b
  })

  plop.setHelper('choicesObject', function (choices) {
    const kebabCase = plop.getHelper('kebabCase')
    const sentenceCase = plop.getHelper('sentenceCase')
    const choicesArr = choices.split(',')

    if (!choicesArr || !Array.isArray(choicesArr)) return '{}'

    const choicesObj = {}
    choicesArr.forEach((choice) => {
      const key = kebabCase(choice.trim())
      const label = sentenceCase(choice.trim())

      choicesObj[key] = { label }
    })

    return JSON.stringify(choicesObj, null, 2)
  })

  plop.setGenerator('Stub page', {
    description:
      'This will create a stub page that can be routed to via nextPage',
    prompts: [
      journeyPrompt,
      sectionKeyPrompt,
      questionKeyPrompt,
      urlPathPrompt
    ],
    actions: [
      {
        type: 'add',
        path: 'src/server/{{camelCase journey}}/{{sectionKey}}/{{kebabCase questionKey}}/index.js',
        templateFile: 'templates/stub-page/index.js.hbs'
      }
    ]
  })

  plop.setGenerator('Question page', {
    description: 'This will create a question page',
    prompts: [
      journeyPrompt,
      sectionKeyPrompt,
      questionKeyPrompt,
      questionPrompt,
      questionTypePrompt,
      radioChoicePrompt,
      urlPathPrompt
    ],
    actions: [
      {
        type: 'add',
        path: 'src/server/{{camelCase journey}}/{{sectionKey}}/{{kebabCase questionKey}}/index.js',
        templateFile: 'templates/question-page/index.js.hbs',
        force: true
      },
      {
        type: 'add',
        path: 'src/server/{{camelCase journey}}/{{sectionKey}}/{{kebabCase questionKey}}/index.test.js',
        templateFile: 'templates/question-page/index.test.js.hbs'
      },
      (answers) => {
        const folderPath = `src/server/${answers.journey}/${answers.sectionKey}/${answers.questionKey.toLowerCase()}/`

        try {
          execSync(`npx eslint ${folderPath}*.js --fix`, { stdio: 'inherit' })
          return `ESLint completed for ${folderPath}`
        } catch (error) {
          return `ESLint warning: ${error.message}`
        }
      },
      '\x1b[41m\x1b[37m\x1b[1m IMPORTANT \x1b[0m',
      "⚠️\tYou will need to manually add it to the section's index.js file.\x1b[0m\t  ⚠️",
      '⚠️\tYou must now fill out the templated areas, search for `//TEMPLATE-TODO`\t  ⚠️'
    ]
  })
}
