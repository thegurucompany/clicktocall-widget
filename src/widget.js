/**
 * Click To Call Widget Entry point
 * @author TheGurúCompany SAPI de CV
 *
 * This class contains the main plugin login that initializes a new instance
 * for a given website, using the configured information for our client's
 * preferences.
 * The main execution of this widget includes
 *  => initialization: validates the given credentials and extra parameters.
 *  => Phone configuration request: fetches user's preferences for working
 *    schedule information and Widget UI (Color, Position)
 *  => Creates a new DOM element with a circular `a` tag than conditionally
 *    establishes communication to our client's main line or shows a custom
 *    error message if cicked off hours.
 * The Intent Schema, Custom Slot and Sample Utterances for this widget, as well
 *  as testing setup and development instructions are located at README.md
 *  in this repository
**/
(() => {
  /**
   * Javascript Internal & External Dependencies.
  **/
  const Promise = require('promise')
  const _z = require('./dom/zepto')
  const ApiClient = require('./api-client')
  const Icons = {
    phone: require('./icons/phone')
  }
  const Styles = require('./styles')
  const Settings = require('./models/settings')
  const WorkSchedule = require('./models/work-schedule')

  /**
   * ClickToCallWidget class.
   * Generates a new instance for embeding a new Plugin when `init` method is
   * called.
  **/
  class ClickToCallWidget {
    /**
     * Validates a given `config` object hash invoked from `init` method.
     * Performs basic presence validation for `apiKey` and `phone` params.
     * Returns a promise that resolves with validated config or
     * rejects with an `Error` preventing further execution.
     * @param {object} config - widget configuration object
     * @return {Promise}
    **/
    validateConfigOptions (config) {
      return new Promise((resolve, reject) => {
        if (config.apiKey && config.phone) {
          this.initializeApiClient(config)
          resolve(config)
        } else {
          reject(
            new Error('please provide a valid apiKey and secret to continue')
          )
        }
      })
    }
    /**
     * Performs an API request for fetching information of the given `phone`
     *  config initialization for work schedule information and Widget UI
     *  (Color, Position) via `ApiClient` class
     * Returns a promise that resolves with HTTP response or rejects
     *  with an HTTP `Error` returned by the server preventing further
     *  execution.
     * @param {object} config - widget configuration object
     * @return {Promise}
    **/
    fetchCompanyPhone (config) {
      return this.apiClient.showCompanyPhone()
    }
    /**
     * Parses an HTTP info response requested via `fecthComanyPhone` method.
     * Updates the instance's variables with parsed results.
     * @param {object} response - HTTP response
     * @return null
    **/
    parseCompanyPhone (response) {
      this.companyPhone = response.body['company_phone']
      this.settings = new Settings(this.companyPhone.settings)
      this.workSchedule = new WorkSchedule(this.companyPhone['work_schedules'])
    }
    /**
     * Initializes a new `ApiClient` instance with the config object parameters
     *  provided on `init` method.
     * @param {object} config - widget configuration object
     * @return null
    **/
    initializeApiClient (config) {
      this.apiClient = new ApiClient(config.apiKey, config.phone)
    }
    /**
     * Intiializes a new HTML Dom widget via `Zepto` dom implementation.
     * Loads CSS compiled styles and injects them in the head section of the
     *  website.
     * Applies the UI config preferences for (Color, Position)
     * Initializes an SVG icon
     * Returns a promise that resolves with HTTP response or rejects
     *  with an HTTP `Error` returned by the server preventing further
     *  execution.
     * @return {Promise}
    **/
    initializeWidget () {
      return new Promise((resolve, reject) => {
        this.loadStyles()
        let widgetTarget = this.getWidgetTarget()
        let widget = _z(
          [
            `<a href="${widgetTarget}" `, 'class="gcomm-click-to-call-button">',
            '</a>'
          ].join(''))
        widget.click(this.widgetOnClick.bind(this))
        this.addWidgetIcon(widget)
        widget.appendTo('body')
        resolve(widget)
      })
    }
    getWidgetTarget () {
      return `tel:${this.companyPhone.phone}`
    }
    widgetOnClick (e) {
      let isWorkScheduleValid = this.workSchedule.isValid()
      if (isWorkScheduleValid) {
        e.preventDefault()
      }
    }
    /**
     * Initializes an SVG icon and appends it to the main widget button
     * @param {DOM} widget - widget zepto object
     * @return null
    **/
    addWidgetIcon (widget) {
      let icon = _z(
        [
          '<svg xmlns="http://www.w3.org/2000/svg"',
          'viewBox="0 0 512 512">',
          '<path fill="#FFFFFF"', `d="${Icons.phone}`, '">',
          '</path>',
          '</svg>'
        ].join(''))
      icon.appendTo(widget)
    }
    /**
     * Loads CSS compiled styles and injects them in the head section of the
     *  website.
     * @return null
    **/
    loadStyles () {
      let options = {
        buttonBackgroundColor: this.settings.getHexColor(),
        buttonHoverBackgroundColor: this.settings.getHexHoverColor()
      }
      let styleContent = Styles(options, this.settings)
      let style = document.createElement('style')
      if (style.styleSheet) {
        style.styleSheet.cssText = styleContent
      } else {
        style.appendChild(document.createTextNode(styleContent))
      }
      _z('head').append(style)
    }
    /**
     * Main widget class initialization.
     * Returns a chained promise that performs the following
     *  operations:
     *  => initialization: validates the given credentials and extra parameters.
     *  => Phone configuration request: fetches user's preferences for working
     *    schedule information and Widget UI (Color, Position)
     *  => Creates a new DOM element with a circular `a` tag than conditionally
     *    establishes communication to our client's main line or shows a custom
     *    error message if cicked off hours.
     * @param {object} config - widget configuration object
     * @return {Promise}
     * @example
     * window.gClickToCall.init({
     *  apiKey: '<YOUR-API-KEY>',
     *  phone: '<10-DIGIT-PHONE>'
     * });
    **/
    init (config) {
      return this.validateConfigOptions(config)
        .then(this.fetchCompanyPhone.bind(this))
        .then(this.parseCompanyPhone.bind(this))
        .then(this.initializeWidget.bind(this))
    }
  }

  window.gClickToCall = new ClickToCallWidget()
})(window)
