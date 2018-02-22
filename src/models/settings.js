/**
 * Click To Call Settings Class
 * @author TheGurúCompany SAPI de CV
 *
 * This class defines a RESTFul click to call settings fetched from Gurucomm's
 *  API.
**/
const Colr = require('colr')
const COLORS = {
  'red': {
    color: 'E74339'
  },
  'gray': {
    color: '666666'
  },
  'orange': {
    color: 'FF6550'
  },
  'green': {
    color: 'A8CE50'
  },
  'blue': {
    color: '129BF4'
  },
  'purple': {
    color: '932C8B'
  },
  'pink': {
    color: 'FF318E'
  },
  'black': {
    color: '000000'
  }
}
const POSITIONS = {
  'left': {
    css: 'left: {{margin}};'
  },
  'right': {
    css: 'right: {{margin}};'
  }
}

class Settings {
  /**
   * Class constructor.
   * Intiializes a new Settings instance with the given data parameters.
   * @param {object} data - JSON object
   * @return {Settings}
  **/
  constructor (data) {
    data = data || {}
    this.color = data['click_to_call_color']
    this.position = data['click_to_call_position']
    this.offHoursMessage = (
      data['click_to_call_off_hours_message'] ||
      this.getDefaultOffHoursMessage()
    )
  }
  /**
   * Returns an hex representation string of the server's configuration `color`
   *  based on predefined `COLORS` enum.
   * If no color is found, default `red` key is assigned.
   * @return {string}
  **/
  getHexColor () {
    let colorData = COLORS[this.color] || COLORS['red']
    return `#${colorData.color}`
  }
  /**
   * Returns a lighter hex representation string of the server's configuration
   * `color`.
   * Original `hexColor` is processed via `Colr` package and ligtened.
   * @return {string}
  **/
  getHexHoverColor () {
    let hexColor = this.getHexColor()
    let colr = Colr.fromHex(hexColor).lighten(5)
    return colr.toHex()
  }
  /**
   * Returns a css position rule based on the server's configuration for
   *  `position` and applies the given `margin` css rule
   * @return {string}
  **/
  getPositionCss (margin) {
    let positionData = POSITIONS[this.position] || POSITIONS['left']
    let replaceRegexp = /{{margin}}/
    let positionCss = positionData.css
    return positionCss.replace(replaceRegexp, margin)
  }
  /**
   * Returns an off hours script based on the server's configuration for
   *  `click_to_call_off_hours_message`.
   * @return {string}
  **/
  getOffHoursMessageContent () {
    let result = null
    if (this.offHoursMessage) {
      result = this.offHoursMessage.split('\n').join('<br />')
    }
    return result
  }
  /**
   * Generates a generic off hours message if server configuration for
   *  `click_to_call_off_hours_message` is empty
   * @return {string}
  **/
  getDefaultOffHoursMessage () {
    return [
      'Thanks for reaching out, we\'re currently not available by phone.',
      'We\'ll be back as soon as possible.',
      'Please browse our site for other contact options.'
    ].join('\n')
  }
}

module.exports = Settings
