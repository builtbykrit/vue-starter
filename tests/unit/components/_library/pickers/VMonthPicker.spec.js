import VMonthPicker from "@/components/_library/pickers/VMonthPicker.vue"
import { mount } from "@vue/test-utils"

describe("VMonthPicker", () => {
  const options = {
    props: {
      modelValue: 6,
    },
  }

  it("emits when a month is chosen", async () => {
    const wrapper = mount(VMonthPicker, options)
    const btns = wrapper.findAll("button")
    expect(btns[4].text()).toBe("May")
    await btns[4].trigger("click")
    // Month numbers are zero-indexed
    expect(wrapper.emitted("update:modelValue")).toEqual([[4]])
  })

  it("validates the model value", () => {
    const validator = VMonthPicker.props.modelValue.validator
    expect(validator(3)).toBeTruthy()
    expect(validator("foo")).toBeFalsy()
  })
})
