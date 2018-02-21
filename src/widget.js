(() => {
  const Promise = require('bluebird')
  const qwery = require('qwery')
  const ApiClient = require('./api-client')

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
    parseCompanyPhone(response){
      this.companyPhone = response['company_phone']
    }
    initializeApiClient (config) {
      this.apiClient = new ApiClient(config.apiKey, config.phone)
    }
    init (config) {
      return this.validateConfigOptions(config)
        .then(this.fetchCompanyPhone.bind(this))
        .then(this.parseCompanyPhone.bind(this))
    }
  }

  window.gClickToCall = new ClickToCallWidget()
})(window)
