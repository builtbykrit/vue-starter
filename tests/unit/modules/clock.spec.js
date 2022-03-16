import clock from "../../../src/modules/clock"
import dayjs from "dayjs"

describe("clock", () => {
  describe("isBeforeNow", () => {
    it("returns TRUE only if the time is before now", () => {
      const pastDate = dayjs().subtract(100, "m").unix()
      expect(clock.isBeforeNow(pastDate)).toBeTruthy()
      const futureDate = dayjs().add(100, "m").unix()
      expect(clock.isBeforeNow(futureDate)).toBeFalsy()
    })
  })
  describe("isValid", () => {
    it("returns TRUE only if the date is valid", () => {
      expect(clock.isValid("01-01-2020")).toBeTruthy()
      expect(clock.isValid("15-15-2020")).toBeFalsy()
    })
  })
  describe("format", () => {
    it("returns the formatted value of a date", () => {
      const date = clock.format("01-01-2020", "MMMM D, YYYY")
      expect(date).toBe("January 1, 2020")
    })
  })
})
