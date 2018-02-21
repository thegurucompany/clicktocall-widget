(() => {
  const Promise = require('bluebird')
  const _z = require('./dom/zepto')
  const ApiClient = require('./api-client')
  const Icons = {
    phone: require('./icons/phone')
  }
  const Styles = require('./styles')

  class ClickToCallWidget {
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
    fetchCompanyPhone (config) {
      return this.apiClient.showCompanyPhone()
    }
    parseCompanyPhone (response) {
      this.companyPhone = response['company_phone']
    }
    initializeApiClient (config) {
      this.apiClient = new ApiClient(config.apiKey, config.phone)
    }
    initializeWidget () {
      return new Promise((resolve, reject) => {
        this.loadStyles()
        let widget = _z('<a href="#" class="gcomm-click-to-call-button"></a>')
        this.applyWidgetStyles(widget)
        this.addWidgetIcon(widget)
        widget.appendTo('body')
        resolve(widget)
      })
    }
    addWidgetIcon(widget){
      let icon = _z(['<svg xmlns="http://www.w3.org/2000/svg"',
        'viewBox="0 0 512 512">',
          '<path fill="#FFFFFF"', `d="${Icons.phone}`,'">',
          '</path>',
        '</svg>'].join(''))
      icon.appendTo(widget)
    }
    loadStyles(){
      let style = document.createElement('style')
      if (style.styleSheet) {
        style.styleSheet.cssText = Styles
      } else {
        style.appendChild(document.createTextNode(Styles))
      }
      _z('head').append(style)
    }
    applyWidgetStyles(widget){
      // TODO apply css classes
    }
    init (config) {
      return this.validateConfigOptions(config)
        .then(this.fetchCompanyPhone.bind(this))
        .then(this.parseCompanyPhone.bind(this))
        .then(this.initializeWidget.bind(this))
    }
  }

  window.gClickToCall = new ClickToCallWidget()
})(window)
