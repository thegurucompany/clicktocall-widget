/**
 * Click To Call ApiClient Class
 * @author TheGurúCompany SAPI de CV
 *
 * This class is responsable for creating HTTP interactions to GuruComm REST API
 *  server.
 * Implements a base interface based on `superagent` npm that handles API
 *  authentication, succes and error handling.
**/
const request = require('superagent')
const config = require('../config')
const Promise = require('promise')
const ENDPOINTS = {
  companyPhones: {
    show: '/company_phones'
  }
}

class ApiClient {
  /**
   * Class constructor.
   * Intiializes a new ApiClient instance with the given parameters.
   * @param {string} apiKey - REST API authentication key
   * @param {string} phone - Clients 10 digit phone
   * @return {ApiClient}
  **/
  constructor (apiKey, phone) {
    this.apiKey = apiKey
    this.phone = phone
  }
  /**
   * Returns a fully formed URL that consists of the union of the config's
   *  API_URL setting and the given `endpoint`
   * @param {string} endpoint - RESTFul path -> /company_phones
   * @return {string}
  **/
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
  /**
   * Appends an authentication token to the given `headers` Hash object.
   * These headers can then be used in a `superagent` or `baseRequest` context
   *  to perform an authenticated HTTP request.
   * The updated headers are then returned
   * @param {object} headers - HTTP headers
   * @return {object}
  **/
  appendAuthHeader (headers) {
    headers['Authorization'] = `Bearer ${this.apiKey}`
    return headers
  }
  /**
   * Executes a GET request via `call` method to fetch information of the
   *  instance's 10 digit phone variable.
   * Returns a promise that resolves with HTTP response or rejects
   *  with an HTTP `Error` returned by the server preventing further
   *  execution.
   * @return {Promise}
  **/
  showCompanyPhone () {
    let endpoint = [ENDPOINTS.companyPhones.show, this.phone].join('/')
    return this.call('get', endpoint)
  }
}

module.exports = ApiClient
