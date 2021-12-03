import notification from "../../../src/modules/notification"

describe("notification", () => {
  it("can generate an error notification", () => {
    const n = notification.createErrorNotification("Oh no!")
    expect(n.id).toBeDefined()
    expect(n.message).toBe("Oh no!")
    expect(n.type).toBe("ERROR")
    expect(n.duration).toBeDefined()
  })

  it("can generate a success notification", () => {
    const n = notification.createSuccessNotification("Yay!")
    expect(n.id).toBeDefined()
    expect(n.message).toBe("Yay!")
    expect(n.type).toBe("SUCCESS")
    expect(n.duration).toBeDefined()
  })

  it("can have a custom duration", () => {
    const n = notification.createSuccessNotification("Yay!", {
      duration: 10000,
    })
    expect(n.duration).toEqual(10000)
  })
})
