const TestResponses = require('./helpers/test-responses')

describe('ClickToCallWidget', () => {
  // karma let spport
  beforeEach(() => {
    this.apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlfaWQiOiI0ODgyZTQ5My02YWY4LTQ4ZGMtODM1OS02MGVhNWJkNjFiYzMifQ.c2SQZtb9MO9U3-BeitfMugkizw0RyWLYngpmra1uGc8'
    this.phone = '9681094007'
  });

  describe('valid requests', () => {
    describe('valid work schedule', () => {
      beforeEach(() => {
        jasmine.Ajax.install()
        jasmine.Ajax.stubRequest(/.*/)
          .andReturn({
            status: 200,
            responseText: JSON.stringify(TestResponses.companyPhonesShow.success)
          })
      });

      afterEach(() => {
        jasmine.Ajax.uninstall()
      });

      it('should initialize a new widget with valid params', async (done) => {
        try{
          await window.gClickToCall.init({
            apiKey: this.apiKey,
            phone: this.phone
          })
        }
        catch (err) {
          expect(err).toBe(null)
        }
        done()
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
