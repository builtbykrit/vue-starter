import dayjs from "dayjs"
import localeData from "dayjs/plugin/localeData"
import weekOfYear from "dayjs/plugin/weekOfYear"
import quarterOfYear from "dayjs/plugin/quarterOfYear"

/** Dayjs Plugins */
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(quarterOfYear)

const clock = {
  /**
   * ===========================================================
   * Constants
   * ===========================================================
   */
  internalDateFormat: "YYYY-MM-DD",
  serverDateTimeFormat: "YYYY-MM-DDTHH:mmZ",
  daysOfWeek: () => dayjs.weekdaysShort(),
  monthsOfYear: (abbreviated = false) =>
    abbreviated ? dayjs.monthsShort() : dayjs.months(),

  /**
   * ===========================================================
   * Formatters
   * ===========================================================
   */
  format: (date = undefined, format = clock.internalDateFormat) =>
    dayjs(date).format(format),
  formatForServer: (date = undefined, format = clock.serverDateTimeFormat) =>
    dayjs(date).format(format),
  parseUnix: (unix, format = clock.serverDateTimeFormat) =>
    dayjs.unix(unix).format(format),

  /**
   * ===========================================================
   * Validators
   * ===========================================================
   */
  isValid: (date) => dayjs(date).isValid(),
  isBefore: (date1, date2 = undefined, scope = "day") =>
    dayjs(date2).isAfter(date1, scope),
  isAfter: (date1, date2 = undefined, scope = "day") =>
    dayjs(date2).isBefore(date1, scope),
  isSame: (date1, date2 = undefined, scope = "day") =>
    dayjs(date2).isSame(date1, scope),

  /**
   * ===========================================================
   * Getters
   * ===========================================================
   */
  getPrevious: (unit, date = undefined) =>
    dayjs(date).subtract(1, unit).format(this.internalDateFormat),
  getNext: (unit, date = undefined) =>
    dayjs(date).add(1, unit).format(this.internalDateFormat),
  getDayOfWeek: (date = undefined) => dayjs(date).day(),
  getDaysInMonth: (date = undefined) => dayjs(date).daysInMonth(),
  getWeekOfYear: (date = undefined) => dayjs(date).week(),
  getMonth: (date = undefined) => dayjs(date).month(),
  getMonthStartDay: (date = undefined) => dayjs(date).startOf("month").day(),
  getQuarter: (date = undefined) => dayjs(date).quarter(),
  getYear: (date = undefined) => dayjs(date).year(),

  /**
   * ===========================================================
   * Settters
   * ===========================================================
   */
}

export default clock
