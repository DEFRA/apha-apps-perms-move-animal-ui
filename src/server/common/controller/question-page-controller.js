import { calculateNextPage } from '../helpers/next-page.js'
/** @import { Server, ServerRegisterPluginObject } from '@hapi/hapi' */
/** @import { NextPage } from '../helpers/next-page.js' */
/** @import { RawPayload } from '../model/answer/answer-model.js' */
/** @import { QuestionPage } from '../model/page/question-page-model.js' */

export class QuestionPageController {
  /**
   * @param {QuestionPage} page
   */
  constructor(page) {
    this.page = page
  }

  /** @returns {ServerRegisterPluginObject<void>} */
  plugin() {
    return {
      plugin: {
        name: `${this.page.sectionKey}-${this.page.questionKey}`,

        /** @param {Server} server */
        register: (server) => {
          server.route([
            {
              method: 'GET',
              path: this.page.urlPath,
              handler: this.getHandler.bind(this)
            },
            {
              method: 'POST',
              path: this.page.urlPath,
              handler: this.postHandler.bind(this)
            }
          ])
        }
      }
    }
  }

  getHandler(req, h) {
    const sectionState = req.yar.get(this.page.sectionKey)
    const answer = this.page.Answer.fromState(
      sectionState?.[this.page.questionKey]
    )

    return h.view(this.page.view, {
      nextPage: req.query.redirect_uri,
      pageTitle: this.page.title,
      heading: this.page.heading,
      value: answer.value
    })
  }

  postHandler(req, h) {
    const payload = /** @type {NextPage} */ (req.payload)
    const Answer = this.page.Answer
    const answer = new Answer(/** @type {RawPayload} */ (payload))
    const { isValid, errors } = answer.validate()

    if (!isValid) {
      req.yar.set(this.page.sectionKey, {
        ...req.yar.get(this.page.sectionKey),
        [this.page.questionKey]: undefined
      })

      return h.view(this.page.view, {
        nextPage: payload.nextPage,
        pageTitle: `Error: ${this.page.title}`,
        heading: this.page.heading,
        value: answer.value,
        errors,
        errorMessages: Answer.errorMessages(errors)
      })
    }

    req.yar.set(this.page.sectionKey, {
      ...req.yar.get(this.page.sectionKey),
      [this.page.questionKey]: answer.toState()
    })
    return h.redirect(
      calculateNextPage(payload.nextPage, this.page.nextPage(answer).urlPath)
    )
  }
}
