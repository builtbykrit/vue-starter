import clock from "../../../src/modules/clock"
import dayjs from "dayjs"

describe("clock", () => {
  describe("Constants", () => {
    it("daysOfWeek returns a shorthand list of weekday names", () => {
      expect(clock.daysOfWeek()).toStrictEqual([
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ])
    })

    describe("monthsOfYear", () => {
      it("returns a list of months", () => {
        expect(clock.monthsOfYear()).toStrictEqual([
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ])
      })
      it("returns a shorthand list of months", () => {
        expect(clock.monthsOfYear(true)).toStrictEqual([
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ])
      })
    })
  })

  describe("Formatters", () => {
    it("format returns the formatted value of a date", () => {
      const date = clock.format("01-01-2020", "MMMM D, YYYY")
      expect(date).toBe("January 1, 2020")
    })
    it("formatForServer returns the server formatted value of a date", () => {
      clock.serverDateTimeFormat = "YYYY-MM-DD[:forServer]"
      const date = clock.formatForServer("01-01-2020")
      expect(date).toBe("2020-01-01:forServer")
    })
    it("parseUnix returns the server formatted value of a unix date", () => {
      clock.serverDateTimeFormat = "YYYY-MM-DD[:forServer]"
      const date = clock.parseUnix(1577862000)
      expect(date).toBe("2020-01-01:forServer")
    })
  })

  describe("Validators", () => {
    describe("isValid", () => {
      it("returns TRUE is the date is valid", () =>
        expect(clock.isValid("01-01-2020")).toBeTruthy())
      it("returns FALSE is the date is invalid", () =>
        expect(clock.isValid("15-15-2020")).toBeFalsy())
    })

    describe("isBefore", () => {
      it("returns TRUE if the date is before now", () => {
        const pastDate = "01-01-2020"
        expect(clock.isBefore(pastDate)).toBeTruthy()
      })
      it("returns FALSE if the date is not before now", () => {
        const futureDate = "01-01-2030"
        expect(clock.isBefore(futureDate)).toBeFalsy()
      })
      it("returns TRUE if the date2 is before date1", () => {
        const date1 = "01-01-2020"
        const date2 = "02-01-2020"
        expect(clock.isBefore(date1, date2)).toBeTruthy()
      })
      it("returns FALSE if the date2 is not before date1", () => {
        const date1 = "02-01-2020"
        const date2 = "01-01-2020"
        expect(clock.isBefore(date1, date2)).toBeFalsy()
      })
    })

    describe("isAfter", () => {
      it("returns TRUE if the date is after now", () => {
        const futureDate = "01-01-2030"
        expect(clock.isAfter(futureDate)).toBeTruthy()
      })
      it("returns FALSE if the date is not after now", () => {
        const pastDate = "01-01-2020"
        expect(clock.isAfter(pastDate)).toBeFalsy()
      })
      it("returns TRUE if the date2 is after date1", () => {
        const date = "01-01-2020"
        const laterDate = "02-01-2020"
        expect(clock.isAfter(laterDate, date)).toBeTruthy()
      })
      it("returns FALSE if the date2 is not after date1", () => {
        const date = "01-01-2021"
        const earlierDate = "01-01-2020"
        expect(clock.isAfter(earlierDate, date)).toBeFalsy()
      })
    })

    describe("isSame", () => {
      it("returns TRUE if the date is same as now", () => {
        const today = dayjs()
        expect(clock.isSame(today, undefined, "day")).toBeTruthy()
      })
      it("returns FALSE if the date is not same as now", () => {
        const futureDate = "01-01-2030"
        expect(clock.isSame(futureDate)).toBeFalsy()
      })
      it("returns TRUE if the date2 is same day as date1", () => {
        const date = "01-01-2020"
        expect(clock.isSame(date, date, "day")).toBeTruthy()
      })
      it("returns FALSE if the date2 is not same day date1", () => {
        const date1 = "01-02-2020"
        const date2 = "01-01-2020"
        expect(clock.isSame(date1, date2, "day")).toBeFalsy()
      })
    })
  })

  describe("Getters", () => {
    describe("getPrevious", () => {
      it("returns previous day date when unit is 'day'", () => {
        expect(clock.getPrevious("day", "2020-01-01")).toBe("2019-12-31")
      })
      it("returns previous week date when unit is 'week'", () => {
        expect(clock.getPrevious("week", "2020-01-01")).toBe("2019-12-25")
      })
      it("returns previous month date when unit is 'month'", () => {
        expect(clock.getPrevious("month", "2020-01-01")).toBe("2019-12-01")
      })
      it("returns previous year date when unit is 'year'", () => {
        expect(clock.getPrevious("year", "2020-01-01")).toBe("2019-01-01")
      })
    })

    describe("getNext", () => {
      it("returns next day date when unit is 'day'", () => {
        expect(clock.getNext("day", "2020-01-01")).toBe("2020-01-02")
      })
      it("returns next week date when unit is 'week'", () => {
        expect(clock.getNext("week", "2020-01-01")).toBe("2020-01-08")
      })
      it("returns next month date when unit is 'month'", () => {
        expect(clock.getNext("month", "2020-01-01")).toBe("2020-02-01")
      })
      it("returns next year date when unit is 'year'", () => {
        expect(clock.getNext("year", "2020-01-01")).toBe("2021-01-01")
      })
    })

    it("getDayOfWeek returns the 0 indexed day number", () => {
      expect(clock.getDayOfWeek("2020-01-01")).toBe(3)
    })
    it("getDaysInMonth returns the number of days in a month", () => {
      expect(clock.getDaysInMonth("2020-01-01")).toBe(31)
    })
    it("getWeekOfYear returns the week number", () => {
      expect(clock.getWeekOfYear("2020-01-01")).toBe(1)
    })
    it("getMonth returns the 0 indexed month number", () => {
      expect(clock.getMonth("2020-01-01")).toBe(0)
    })
    it("getMonthStartDay returns the week day number for the first day of the month", () => {
      expect(clock.getMonthStartDay("2020-01-01")).toBe(3)
    })
    it("getQuarter returns the quarter number", () => {
      expect(clock.getQuarter("2020-01-01")).toBe(1)
    })
    it("getYear returns the year number", () => {
      expect(clock.getYear("2020-01-01")).toBe(2020)
    })
  })

  describe("Setters", () => {
    it("setMonth sets the month", () => {
      expect(clock.setMonth("2020-01-01", 1)).toBe("2020-02-01")
    })
    it("setQuarter sets the quarter", () => {
      expect(clock.setQuarter("2020-01-01", 2)).toBe("2020-04-01")
    })
    it("setYear sets the year", () => {
      expect(clock.setYear("2020-01-01", 2022)).toBe("2022-01-01")
    })
  })
})
