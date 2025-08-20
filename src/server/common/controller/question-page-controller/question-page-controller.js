import { calculateNextPage } from '~/src/server/common/helpers/next-page.js'
import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'
import GenericPageController from '~/src/server/common/controller/generic-page-controller/index.js'
import { nextPageRedirect } from '~/src/server/common/helpers/next-page-redirect/index.js'
import { getAuthOptions } from '~/src/server/common/helpers/auth/toggles-helper.js'

/** @import { Server, ServerRegisterPluginObject } from '@hapi/hapi' */
/** @import { NextPage } from '~/src/server/common/helpers/next-page.js' */
/** @import { RawPayload } from '~/src/server/common/model/answer/answer-model.js' */
/** @import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js' */
/** @import { StateManager } from '~/src/server/common/model/state/state-manager.js' */

export class QuestionPageController extends GenericPageController {
  /** @type {typeof StateManager} */
  StateManager

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
          `${this.StateManager.key}-${this.page.sectionKey}-${this.page.constructor.name}`,

        /** @param {Server} server */
        register: (server) => {
          const options = {
            ...getAuthOptions(this.page.skipAuth)
          }

          server.route([
            {
              method: 'GET',
              path: this.page.urlPath,
              handler: this.getHandler.bind(this),
              options
            },
            {
              method: 'POST',
              path: this.page.urlPath,
              handler: this.postHandler.bind(this),
              options
            }
          ])
        }
      }
    }
  }

  async handleGet(req, h, args = {}) {
    const applicationState = new this.StateManager(req).toState()
    const sectionState = applicationState[this.page.sectionKey]
    const answer = this.page.Answer.fromState(
      sectionState?.[this.page.questionKey],
      applicationState
    )

    const pageError = req.yar.get(this.errorKey)

    if (pageError) {
      const errorAnswer = new this.page.Answer(
        pageError.payload,
        applicationState
      )
      const errorViewModelOptions = {
        validate: true,
        question: this.page.question
      }

      return h.view(this.page.view, {
        nextPage: req.query.redirect_uri,
        heading: this.page.heading,
        answer: errorAnswer,
        pageTitle: `Error: ${this.page.title}`,
        errors: pageError.errors,
        errorMessages: pageError.errorMessages,
        answerViewModel: await errorAnswer.viewModel(errorViewModelOptions),
        ...args,
        ...(await this.page.viewProps(req))
      })
    }
    const viewModelOptions = {
      validate: false,
      question: this.page.question
    }

    return h.view(this.page.view, {
      nextPage: req.query.redirect_uri,
      pageTitle: this.page.title,
      heading: this.page.heading,
      value: answer.value,
      answer,
      answerViewModel: await answer.viewModel(viewModelOptions),
      ...args,
      ...(await this.page.viewProps(req))
    })
  }

  handlePost(req, h) {
    req.yar.clear(this.errorKey)
    const payload = /** @type {NextPage} */ (req.payload)
    const state = new this.StateManager(req)
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
        payload
      })

      return h.redirect(nextPageRedirect(this.page, req.query))
    }

    state.set(this.page, answer)

    const nextPage = this.page.nextPage(answer, applicationState)

    if (nextPage instanceof ExitPage) {
      return h.redirect(nextPage.urlPath)
    } else {
      if (nextPage.overrideRedirects) {
        return h.redirect(nextPageRedirect(nextPage, req.query))
      }

      return h.redirect(calculateNextPage(payload.nextPage, nextPage.urlPath))
    }
  }
}
