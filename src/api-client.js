const request = require('superagent')
const config = require('../config')
const Promise = require('promise')
const ENDPOINTS = {
  companyPhones: {
    show: '/company_phones'
  }
}

class ApiClient {
  constructor (apiKey, phone) {
    this.apiKey = apiKey
    this.phone = phone
  }
  getURL (endpoint) {
    return [
      config.API_URL,
      endpoint
    ].join('')
  }
  /**
    * returns a superagent request for the given path, method and params
    * @param {string}  method - HTTP Method [GET, POST, PUT, DELETE,...]
    * @param {string}  route - dot based route from endpoints const
    * @param {object}  params - optional HTTP parameters to be sent
    * @param {object}  headers - optional HTTP headers to be sent
    *
    * @return {object} - superagent request
  */
  baseRequest (method, endpoint, params, headers) {
    method = method.toLowerCase()
    let url = this.getURL(endpoint)
    let req = request[method](url)

    if (params) {
      if (method === 'get') req.query(params)
      else req.send(params)
    }
    if (headers) {
      let keys = Object.keys(headers)
      for (let key of keys) {
        let val = headers[key]
        if (val) req.set(key, val)
      }
    }
    return req
  }
  /**
    * executes an API Call to via baseRequest abstractions. returns a promise
    * promise, rejecting on any HTTP errors or resolving with response
    * @param {string}  method - HTTP Method [GET, POST, PUT, DELETE,...]
    * @param {string}  route - dot based route from endpoints const
    * @param {object}  params - optional HTTP parameters to be sent
    * @param {object}  headers - optional HTTP headers to be sent
    *
    * @return {Promise}
    */
  call (method, route, params, headers) {
    return new Promise((resolve, reject) => {
      headers = headers || {}
      headers = this.appendAuthHeader(headers)
      this.baseRequest(method, route, params, headers)
        .end((err, res) => {
          if (err) {
            let httpError = err.response.text
            reject(new Error(httpError))
          } else resolve(res)
        })
    })
  }
  appendAuthHeader (headers) {
    headers['Authorization'] = `Bearer ${this.apiKey}`
    return headers
  }
  showCompanyPhone () {
    let endpoint = [ENDPOINTS.companyPhones.show, this.phone].join('/')
    return this.call('get', endpoint)
  }
}

module.exports = ApiClient
