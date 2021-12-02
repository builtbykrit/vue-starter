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
})
