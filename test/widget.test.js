const TestResponses = require('./helpers/test-responses')
const _z = require('../src/dom/zepto')

describe('ClickToCallWidget', () => {
  // karma let spport
  beforeEach(() => {
    this.apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlfaWQiOiI0ODgyZTQ5My02YWY4LTQ4ZGMtODM1OS02MGVhNWJkNjFiYzMifQ.c2SQZtb9MO9U3-BeitfMugkizw0RyWLYngpmra1uGc8'
    this.phone = '9681094007'
  });

  describe('valid requests', () => {
    describe('layout', () => {
      let mockSuccessAjaxRequest = (overrides) => {
        let response = TestResponses.companyPhonesShow.success
        if(overrides) _z.extend(true, response, overrides)
        jasmine.Ajax.stubRequest(/.*/)
          .andReturn({
            status: 200,
            responseText: JSON.stringify(response)
          })
      }

      let itShouldPerformAValidWidgetCycle = async () => {
        try{
          return await window.gClickToCall.init({
            apiKey: this.apiKey,
            phone: this.phone
          })
        }
        catch (err) {
          expect(err).toBe(null)
        }
      }

      let getWidget = () => {
        return _z('.gcomm-click-to-call-button')
      }

      beforeEach(() => {
        jasmine.Ajax.install()

      });

      afterEach(() => {
        jasmine.Ajax.uninstall()
      });

      it('should initialize a new widget with blue color and right position', async (done) => {
        mockSuccessAjaxRequest({
          'company_phone': {
            'settings': {
              'click_to_call_color': 'blue',
              'click_to_call_position': 'right'
            }
          }
        })
        itShouldPerformAValidWidgetCycle()
          .then(() => {
            // widget HTML expectations
            let widget = getWidget()
            expect(widget.css('background-color')).toBe('rgb(18, 155, 244)')
          })
          .finally(() =>{
            done()
          })
      })

      it('should initialize a new widget with pink color and left position', async (done) => {
        mockSuccessAjaxRequest({
          'company_phone': {
            'settings': {
              'click_to_call_color': 'pink',
              'click_to_call_position': 'left'
            }
          }
        })
        itShouldPerformAValidWidgetCycle()
          .then(() => {
            // widget HTML expectations
            let widget = getWidget()
            expect(widget.css('background-color')).toBe('rgb(255, 49, 142)')
          })
          .finally(() =>{
            done()
          })
      })
    })
  })

  describe('invalid requests', () =>{
    describe('invalid apiKey', () =>{
      beforeEach(() =>{
        jasmine.Ajax.install()
        jasmine.Ajax.stubRequest(/.*/)
          .andReturn({
            status: 401,
          })
      })

      afterEach(() => {
        jasmine.Ajax.uninstall()
      })

      it('should not initialize a new widget with invalid API Key params', async (done) => {
        try{
          await window.gClickToCall.init({
            apiKey: 'xxx',
            phone: this.phone
          })
        }
        catch (err) {
          expect(err).not.toBe(null)
        }
        done()
      })
    })
  })
})
