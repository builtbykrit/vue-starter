import dayjs from "dayjs"
import localeData from "dayjs/plugin/localeData"
import weekOfYear from "dayjs/plugin/weekOfYear"

/** Dayjs Plugins */
dayjs.extend(localeData)
dayjs.extend(weekOfYear)

export default {
  /**
   * ===========================================================
   * Constants
   * ===========================================================
   */
  internalDateFormat: "YYYY-MM-DD",
  serverDateTimeFormat: "YYYY-MM-DDTHH:mmZ",
  daysOfWeek: () => dayjs.weekdaysShort(),
  /**
   * ===========================================================
   * Formatters
   * ===========================================================
   */
  format: (date, format) => dayjs(date).format(format),
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
  getWeekStartDay: (date = undefined) => dayjs(date).startOf("week").day(),
  getMonthStartDay: (date = undefined) => dayjs(date).startOf("month").day(),
  /**
   * ===========================================================
   * Settters
   * ===========================================================
   */
}
