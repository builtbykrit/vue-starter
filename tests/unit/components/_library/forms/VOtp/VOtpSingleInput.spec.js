import { mount } from "@vue/test-utils"
import VOtpSingleInput from "@/components/_library/forms/VOtp/VOtpSingleInput"

describe("VOtpSingleInput", () => {
  it("On Focus should emit a 'focus' event", async () => {
    const wrapper = mount(VOtpSingleInput)
    const input = wrapper.find("input")

    await input.trigger("focus")
    expect(wrapper.emitted("focus")).toBeTruthy()
  })
  it("On Blur should emit a 'blur' event", async () => {
    const wrapper = mount(VOtpSingleInput)
    const input = wrapper.find("input")

    await input.trigger("blur")
    expect(wrapper.emitted("blur")).toBeTruthy()
  })
  it("On Input should emit a 'input' event", async () => {
    const wrapper = mount(VOtpSingleInput)
    const input = wrapper.find("input")

    await input.setValue("1")
    expect(wrapper.emitted("input")).toBeTruthy()
  })
})
