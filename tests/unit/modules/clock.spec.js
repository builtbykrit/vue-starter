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
  })

  describe("Formatters", () => {
    it("format returns the formatted value of a date", () => {
      const date = clock.format("01-01-2020", "MMMM D, YYYY")
      expect(date).toBe("January 1, 2020")
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

  describe("Getters", () => {})

  describe("Setters", () => {})
})
