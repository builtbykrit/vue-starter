import dayjs from "dayjs"

export default {
  /**
   * Checks if a Unix time is before now
   * @param unix
   * @returns {boolean}
   */
  isBeforeNow: (unix) => dayjs().isAfter(dayjs.unix(unix)),
  isValid: (date) => dayjs(date).isValid(),
  format: (date, format) => dayjs(date).format(format),
}
