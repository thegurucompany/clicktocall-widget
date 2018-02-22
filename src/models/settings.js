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
  constructor (data) {
    data = data || {}
    this.color = data['click_to_call_color']
    this.position = data['click_to_call_position']
    this.offHoursMessage = (
      data['click_to_call_off_hours_message'] ||
      this.getDefaultOffHoursMessage()
    )
  }
  getHexColor () {
    let colorData = COLORS[this.color] || COLORS['red']
    return `#${colorData.color}`
  }
  getHexHoverColor () {
    let hexColor = this.getHexColor()
    let colr = Colr.fromHex(hexColor).lighten(5)
    return colr.toHex()
  }
  getPositionCss (margin) {
    let positionData = POSITIONS[this.position] || POSITIONS['left']
    let replaceRegexp = /{{margin}}/
    let positionCss = positionData.css
    return positionCss.replace(replaceRegexp, margin)
  }
  getOffHoursMessageContent () {
    let result = null
    if (this.offHoursMessage) {
      result = this.offHoursMessage.split('\n').join('<br />')
    }
    return result
  }
  getDefaultOffHoursMessage () {
    return [
      'Thanks for reaching out, we\'re currently not available by phone.',
      'We\'ll be back as soon as possible.',
      'Please browse our site for other contact options.'
    ].join('\n')
  }
}

module.exports = Settings
