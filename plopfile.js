import { journeyPrompt } from './prompts/journey-prompt.js'
import { questionKeyPrompt } from './prompts/question-key-prompt.js'
import { questionPrompt } from './prompts/question-prompt.js'
import { sectionKeyPrompt } from './prompts/section-key-prompt.js'
import { urlPathPrompt } from './prompts/url-path-prompt.js'

export default function (plop) {
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
      '\x1b[41m\x1b[37m\x1b[1m IMPORTANT \x1b[0m',
      "⚠️\tYou will need to manually add it to the section's index.js file.\x1b[0m\t  ⚠️",
      '⚠️\tYou must now fill out the templated areas, search for `//TEMPLATE-TODO`\t  ⚠️'
    ]
  })
}
