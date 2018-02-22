const TestResponses = require('./helpers/test-responses')
const _z = require('../src/dom/zepto')

describe('ClickToCallWidget', () => {
  // karma let spport
  beforeEach(() => {
    this.apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlfaWQiOiI0ODgyZTQ5My02YWY4LTQ4ZGMtODM1OS02MGVhNWJkNjFiYzMifQ.c2SQZtb9MO9U3-BeitfMugkizw0RyWLYngpmra1uGc8'
    this.phone = '9681094007'
  })

  afterEach(() => {
    _z('body').html('')
  })

  describe('valid requests', () => {
    let mockSuccessAjaxRequest = (overrides) => {
      let response = TestResponses.companyPhonesShow.success
      if (overrides) _z.extend(true, response, overrides)
      jasmine.Ajax.stubRequest(/.*/)
        .andReturn({
          status: 200,
          responseText: JSON.stringify(response)
        })
    }

    let itShouldPerformAValidWidgetCycle = async () => {
      try {
        return await window.gClickToCall.init({
          apiKey: this.apiKey,
          phone: this.phone
        })
      } catch (err) {
        expect(err).toBe(null)
      }
    }

    let getWidget = () => {
      return _z('.gcomm-click-to-call-button')
    }

    let getOffHoursBox = () => {
      return _z('.gcomm-click-to-call-off-hours')
    }

    beforeEach(() => {
      jasmine.Ajax.install()
    })

    afterEach(() => {
      jasmine.Ajax.uninstall()
    })

    describe('layout', () => {
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
          .finally(() => {
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
          .finally(() => {
            done()
          })
      })
    })

    describe('work schedule', () => {
      it('should not display off hours box with valid WorkSchedule days & hours', async (done) => {
        mockSuccessAjaxRequest({
          'company_phone': {
            'work_schedules': [
              {
                'days': 127,
                'starts_at': '2018-02-18T00:00:00.000Z',
                'ends_at': '2018-02-19T23:59:59.000Z'
              }
            ]
          }
        })
        itShouldPerformAValidWidgetCycle()
          .then(() => {
            let widget = getWidget()
            let offHoursBox = getOffHoursBox()
            widget.click(e => {
              e.preventDefault()
              expect(offHoursBox.css('display')).toBe('none')
            })
            widget.click()
          })
          .finally(() => {
            done()
          })
      })

      it('should display off hours box with invalid WorkSchedule day', async (done) => {
        let today = new Date()
        let todayBit = Math.pow(2, today.getDay())
        mockSuccessAjaxRequest({
          'company_phone': {
            'work_schedules': [
              {
                'days': 127 ^ todayBit,
                'starts_at': '2018-02-18T00:00:00.000Z',
                'ends_at': '2018-02-19T23:59:59.000Z'
              }
            ]
          }
        })
        itShouldPerformAValidWidgetCycle()
          .then(() => {
            let widget = getWidget()
            let offHoursBox = getOffHoursBox()
            widget.click()
            expect(offHoursBox.css('display')).toBe('block')
          })
          .finally(() => {
            done()
          })
      })

      it('should display off hours box with invalid WorkSchedule hours', async (done) => {
        mockSuccessAjaxRequest({
          'company_phone': {
            'work_schedules': [
              {
                'days': 127,
                'starts_at': '2018-02-18T00:00:00.000Z',
                'ends_at': '2018-02-19T00:00:00.000Z'
              }
            ]
          }
        })
        itShouldPerformAValidWidgetCycle()
          .then(() => {
            let widget = getWidget()
            let offHoursBox = getOffHoursBox()
            widget.click()
            expect(offHoursBox.css('display')).toBe('block')
          })
          .finally(() => {
            done()
          })
      })
    })
  })

  describe('invalid requests', () => {
    describe('invalid apiKey', () => {
      beforeEach(() => {
        jasmine.Ajax.install()
        jasmine.Ajax.stubRequest(/.*/)
          .andReturn({
            status: 401
          })
      })

      afterEach(() => {
        jasmine.Ajax.uninstall()
      })

      it('should not initialize a new widget with invalid API Key params', async (done) => {
        try {
          await window.gClickToCall.init({
            apiKey: 'xxx',
            phone: this.phone
          })
        } catch (err) {
          expect(err).not.toBe(null)
        }
        done()
      })
    })
  })
})
