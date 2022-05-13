import VMonthPicker from "@/components/_library/forms/pickers/VMonthPicker.vue"
import { mount } from "@vue/test-utils"

describe("VMonthPicker", () => {
  const options = {
    props: {
      modelValue: "2020-01-01",
    },
  }

  it("emits when a month is chosen", async () => {
    const wrapper = mount(VMonthPicker, options)
    const btns = wrapper.findAll("button")

    expect(btns[6].text()).toBe("May")
    await btns[6].trigger("click")

    expect(wrapper.emitted("update:modelValue")[0][0]).toEqual("2020-05-01")
  })

  it("emits when a month with a different year is chosen", async () => {
    const wrapper = mount(VMonthPicker, options)
    const btns = wrapper.findAll("button")

    await btns[1].trigger("click")
    expect(btns[6].text()).toBe("May")
    await btns[6].trigger("click")
    // Month numbers are zero-indexed
    expect(wrapper.emitted("update:modelValue")[0][0]).toEqual("2021-05-01")
  })
})
