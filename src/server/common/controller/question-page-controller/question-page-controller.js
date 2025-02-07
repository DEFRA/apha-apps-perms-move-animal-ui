import { calculateNextPage } from '../../helpers/next-page.js'
import { ExitPage } from '../../model/page/exit-page-model.js'
import GenericPageController from '../generic-page-controller/index.js'
/** @import { Server, ServerRegisterPluginObject } from '@hapi/hapi' */
/** @import { NextPage } from '../../helpers/next-page.js' */
/** @import { RawPayload } from '../../model/answer/answer-model.js' */
/** @import { QuestionPage } from '../../model/page/question-page-model.js' */

export class QuestionPageController extends GenericPageController {
  /**
   * @param {QuestionPage} page
   */
  constructor(page) {
    super(page)
    this.page = page
  }

  /** @returns {ServerRegisterPluginObject<void>} */
  plugin() {
    return {
      plugin: {
        name:
          this.pluginName ?? `${this.page.sectionKey}-${this.page.questionKey}`,

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

  handleGet(req, h, args = {}) {
    const sectionState = req.yar.get(this.page.sectionKey)
    const answer = this.page.Answer.fromState(
      sectionState?.[this.page.questionKey]
    )

    return h.view(this.page.view, {
      nextPage: req.query.redirect_uri,
      pageTitle: this.page.title,
      heading: this.page.heading,
      value: answer.value,
      answer,
      viewModelOptions: { validate: false, question: this.page.question },
      ...this.page.viewProps(req),
      ...args
    })
  }

  handlePost(req, h) {
    const payload = /** @type {NextPage} */ (req.payload)
    const Answer = this.page.Answer
    const answer = new Answer(/** @type {RawPayload} */ (payload))
    const { isValid, errors } = answer.validate()

    if (!isValid) {
      this.recordErrors(errors)

      req.yar.set(this.page.sectionKey, {
        ...req.yar.get(this.page.sectionKey),
        [this.page.questionKey]: undefined
      })

      return h.view(this.page.view, {
        nextPage: payload.nextPage,
        pageTitle: `Error: ${this.page.title}`,
        heading: this.page.heading,
        value: answer.value,
        answer,
        viewModelOptions: { validate: true, question: this.page.question },
        errors,
        errorMessages: Answer.errorMessages(errors),
        ...this.page.viewProps(req)
      })
    }

    req.yar.set(this.page.sectionKey, {
      ...req.yar.get(this.page.sectionKey),
      [this.page.questionKey]: answer.toState()
    })

    const nextPage = this.page.nextPage(answer)

    if (nextPage instanceof ExitPage) {
      return h.redirect(nextPage.urlPath)
    } else {
      if (nextPage.overrideRedirects) {
        const query = new URLSearchParams(req.query)
        let url = nextPage.urlPath

        if (query.size > 0) {
          url += `?${query.toString()}`
        }
        return h.redirect(url)
      }

      return h.redirect(calculateNextPage(payload.nextPage, nextPage.urlPath))
    }
  }
}
