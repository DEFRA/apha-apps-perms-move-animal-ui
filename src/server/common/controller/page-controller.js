import { calculateNextPage } from '~/src/server/common/helpers/next-page.js'

/** @import { Page } from '../model/page/page-model.js' */
/** @import { Server, ServerRegisterPluginObject } from '@hapi/hapi' */
/** @import { NextPage } from '~/src/server/common/helpers/next-page.js' */

export class PageController {
  /** @param {Page} page */
  constructor(page) {
    this.page = page
  }

  /** @returns {ServerRegisterPluginObject<void>} */
  plugin() {
    return {
      plugin: {
        name: `${this.page.section}-${this.page.questionKey}`,

        /** @param {Server} server */
        register: (server) => {
          server.route([
            {
              method: 'GET',
              path: this.page.path,
              handler: this.getHandler.bind(this)
            },
            {
              method: 'POST',
              path: this.page.path,
              handler: this.postHandler.bind(this)
            }
          ])
        }
      }
    }
  }

  getHandler(req, h) {
    const { heading, question, pageTitle, Answer, section, questionKey } =
      this.page
    const answer = Answer.fromState(req.yar.get(section)?.[questionKey])

    return h.view(this.page.view, {
      nextPage: req.query.redirect_uri,
      pageTitle,
      heading,
      question,
      value: answer.value
    })
  }

  postHandler(req, h) {
    const { heading, question, pageTitle, Answer, section, questionKey, view } =
      this.page

    const payload = /** @type {NextPage} */ (req.payload)
    const answer = new Answer(/** @type any */ (payload))

    const { isValid, errors } = answer.validate()

    const errorMessages = this.page.errorMessages(errors)

    if (!isValid) {
      req.yar.set(section, {
        ...req.yar.get(section),
        [questionKey]: undefined
      })

      return h.view(view, {
        nextPage: payload.nextPage,
        pageTitle: `Error: ${pageTitle}`,
        heading,
        question,
        value: answer.value,
        errorMessages,
        errors
      })
    }

    req.yar.set(section, {
      ...req.yar.get(section),
      [questionKey]: answer.toState()
    })

    return h.redirect(calculateNextPage(payload.nextPage, this.page.nextPage()))
  }
}
