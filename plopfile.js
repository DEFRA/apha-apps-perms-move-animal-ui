import { execSync } from 'child_process'

import { journeyPrompt } from './prompts/journey-prompt.js'
import { questionKeyPrompt } from './prompts/question-key-prompt.js'
import { questionPrompt } from './prompts/question-prompt.js'
import { questionTypePrompt } from './prompts/question-type-prompt.js'
import { sectionKeyPrompt } from './prompts/section-key-prompt.js'
import { urlPathPrompt } from './prompts/url-path-prompt.js'
import { questionHintPrompt } from './prompts/question-hint-prompt.js'
import { sectionTitlePrompt } from './prompts/section-title-prompt.js'
import { newSectionKeyPrompt } from './prompts/new-section-key-prompt.js'
import { pageNamePrompt } from './prompts/page-name-prompt.js'
import { headingPrompt } from './prompts/heading-prompt.js'

export default function (plop) {
  const kebabCase = plop.getHelper('kebabCase')

  plop.setHelper('eq', (a, b) => {
    return a === b
  })

  plop.setGenerator('Exit page', {
    description: 'This will create an exit page',
    prompts: [
      journeyPrompt,
      sectionKeyPrompt,
      {
        ...questionKeyPrompt,
        message: 'What is the \x1b[33mpage key\x1b[0m of the new page?'
      },
      {
        ...questionPrompt,
        message: 'What is the \x1b[33mheading\x1b[0m of the new exit page?'
      },
      urlPathPrompt
    ],
    actions: [
      {
        type: 'add',
        force: true,
        path: 'src/server/{{kebabCase journey}}/{{kebabCase sectionKey}}/{{kebabCase questionKey}}/index.js',
        templateFile: 'templates/exit-page/index.js.hbs'
      },
      {
        type: 'add',
        force: true,
        path: 'src/server/{{kebabCase journey}}/{{kebabCase sectionKey}}/{{kebabCase questionKey}}/index.test.js',
        templateFile: 'templates/exit-page/index.test.js.hbs'
      },
      {
        type: 'add',
        force: true,
        path: 'src/server/{{kebabCase journey}}/{{kebabCase sectionKey}}/{{kebabCase questionKey}}/index.njk',
        templateFile: 'templates/exit-page/index.njk.hbs'
      }
    ]
  })

  plop.setGenerator('Content page', {
    description: 'This will create a generic content page',
    prompts: [journeyPrompt, pageNamePrompt, urlPathPrompt, headingPrompt],
    actions: [
      {
        type: 'add',
        path: 'src/server/{{kebabCase journey}}/{{kebabCase pageName}}/index.js',
        templateFile: 'templates/content-page/index.js.hbs'
      },
      {
        type: 'add',
        path: 'src/server/{{kebabCase journey}}/{{kebabCase pageName}}/index.test.js',
        templateFile: 'templates/content-page/index.test.js.hbs'
      },
      {
        type: 'add',
        path: 'src/server/{{kebabCase journey}}/{{kebabCase pageName}}/index.njk',
        templateFile: 'templates/content-page/index.njk.hbs'
      }
    ]
  })

  plop.setGenerator('Section', {
    description: 'This will create a section within the selected journey',
    prompts: [journeyPrompt, newSectionKeyPrompt, sectionTitlePrompt],
    actions: [
      {
        type: 'add',
        force: true,
        path: 'src/server/{{kebabCase journey}}/{{kebabCase sectionKey}}/section.js',
        templateFile: 'templates/section/section.js.hbs'
      },
      {
        type: 'add',
        force: true,
        path: 'src/server/{{kebabCase journey}}/{{kebabCase sectionKey}}/section.test.js',
        templateFile: 'templates/section/section.test.js.hbs'
      },
      {
        type: 'add',
        force: true,
        path: 'src/server/{{kebabCase journey}}/{{kebabCase sectionKey}}/check-answers/index.js',
        templateFile: 'templates/section/check-answers.js.hbs'
      },
      {
        type: 'add',
        force: true,
        path: 'src/server/{{kebabCase journey}}/{{kebabCase sectionKey}}/check-answers/index.test.js',
        templateFile: 'templates/section/check-answers.test.js.hbs'
      },
      (answers) => {
        const folderPath = `src/server/${answers.journey}/${kebabCase(answers.sectionKey)}/`

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
      questionHintPrompt,
      questionTypePrompt,
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
        const folderPath = `src/server/${answers.journey}/${kebabCase(answers.sectionKey)}/${kebabCase(answers.questionKey)}/`

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
