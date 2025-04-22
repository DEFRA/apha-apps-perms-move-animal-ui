import { calculateNextPage } from '../../helpers/next-page.js'
import { ExitPage } from '../../model/page/exit-page-model.js'
import GenericPageController from '../generic-page-controller/index.js'
import { StateManager } from '../../model/state/state-manager.js'

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
    this.errorKey = `errors:${this.page.sectionKey}:${this.page.questionKey}`
  }

  /** @returns {ServerRegisterPluginObject<void>} */
  plugin() {
    return {
      plugin: {
        name:
          this.pluginName ??
          `${this.page.sectionKey}-${this.page.constructor.name}`,

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
    const applicationState = new StateManager(req).toState()
    const sectionState = applicationState[this.page.sectionKey]
    const answer = this.page.Answer.fromState(
      sectionState?.[this.page.questionKey],
      applicationState
    )

    const pageError = req.yar.get(this.errorKey)

    const errorProps = {}
    if (pageError) {
      errorProps.pageTitle = `Error: ${this.page.title}`
      errorProps.errors = pageError.errors
      errorProps.errorMessages = pageError.errorMessages
      errorProps.viewModelOptions = {
        validate: true,
        question: this.page.question
      }

      return h.view(this.page.view, {
        nextPage: req.query.redirect_uri,
        heading: this.page.heading,
        answer: this.page.Answer.fromState(pageError?.value, applicationState),
        ...errorProps,
        viewModelOptions: {
          validate: true,
          question: this.page.question
        },
        ...args,
        ...this.page.viewProps(req)
      })
    }

    return h.view(this.page.view, {
      nextPage: req.query.redirect_uri,
      pageTitle: this.page.title,
      heading: this.page.heading,
      value: answer.value,
      answer,
      viewModelOptions: {
        validate: false,
        question: this.page.question
      },
      ...args,
      ...this.page.viewProps(req)
    })
  }

  handlePost(req, h) {
    req.yar.clear(this.errorKey)
    const payload = /** @type {NextPage} */ (req.payload)
    const state = new StateManager(req)
    const applicationState = state.toState()
    const Answer = this.page.Answer
    const answer = new Answer(
      /** @type {RawPayload} */ (payload),
      applicationState
    )
    const { isValid, errors } = answer.validate()

    if (!isValid) {
      this.recordErrors(errors)
      state.set(this.page, undefined)

      req.yar.set(this.errorKey, {
        errors,
        errorMessages: Answer.errorMessages(errors),
        value: answer.value
      })

      return h.redirect(this.page.urlPath)
    }

    state.set(this.page, answer)

    const nextPage = this.page.nextPage(answer, applicationState)

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
