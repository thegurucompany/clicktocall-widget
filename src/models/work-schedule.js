/**
 * Click To Call WorkSchedule Class
 * @author TheGurúCompany SAPI de CV
 *
 * This class defines a RESTFul WorkSchedule fetched from Gurucomm's API.
**/
class WorkSchedule {
  /**
   * Class constructor.
   * Intiializes a new WorkSchedule instance with the given data parameters.
   * @param {object} data - JSON object
   * @return {WorkSchedule}
  **/
  constructor (data) {
    data = data || []
    let workScheduleData = data[0]
    this.isInvalid = (workScheduleData === undefined)
    if (!this.isInvalid) {
      this.startsAt = this.getUtcDate(workScheduleData['starts_at'])
      this.endsAt = this.getUtcDate(workScheduleData['ends_at'])
      this.days = workScheduleData.days
    }
  }
  /**
   * Converts an utc date string formatted to a local date time.
   * @param {string} utcDateStr - iso date
   * @return {WorkSchedule}
  **/
  getUtcDate (utcDateStr) {
    let date = new Date(utcDateStr)
    let utcDate = new Date()
    utcDate.setHours(date.getUTCHours())
    utcDate.setMinutes(date.getUTCMinutes())
    utcDate.setSeconds(date.getUTCSeconds())
    return utcDate
  }
  /**
   * returns true if the current day is included in configured `days` params
   * by performing a bit comparison operator.
   * @return {boolean}
  **/
  isValidDay () {
    let today = new Date()
    let todayBit = Math.pow(2, today.getDay())
    return this.days > 0 && ((todayBit & this.days) === todayBit)
  }
  /**
   * returns true if the current time is between the configured `startsAt` and
   *  `endTime` interval.
   * @return {boolean}
  **/
  isValidHour () {
    let currentTime = new Date().getTime()
    let startTime = this.startsAt.getTime()
    let endTime = this.endsAt.getTime()
    return currentTime > startTime && currentTime < endTime
  }
  /**
   * returns true if current date time is invalid for the configured
   *  `WorkSchedule`
   * @return {boolean}
  **/
  isInvalidSchedule () {
    return !this.isInvalid && (!this.isValidDay() || !this.isValidHour())
  }
}

module.exports = WorkSchedule
