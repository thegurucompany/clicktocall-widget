class WorkSchedule {
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
  getUtcDate (utcDateStr) {
    let date = new Date(utcDateStr)
    let utcDate = new Date()
    utcDate.setHours(date.getUTCHours())
    utcDate.setMinutes(date.getUTCMinutes())
    utcDate.setSeconds(date.getUTCSeconds())
    return utcDate
  }
  isValidDay () {
    let today = new Date()
    let todayBit = Math.pow(2, today.getDay())
    return (todayBit && this.days) === todayBit
  }
  isValidHour () {
    let todayTime = new Date().getTime()
    let startTime = this.startsAt.getTime()
    let endTime = this.endsAt.getTime()
    return todayTime >= startTime && todayTime <= endTime
  }
  isValid () {
    return this.isInvalid || (this.isValidDay() && this.isValidHour())
  }
}

module.exports = WorkSchedule
