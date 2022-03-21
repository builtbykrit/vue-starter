import VYearPicker from "@/components/_library/forms/pickers/VYearPicker.vue"
import { mount } from "@vue/test-utils"

describe("VYearPicker", () => {
  const options = {
    props: {
      firstYear: 2021,
      modelValue: 2022,
    },
  }

  it("emits when a year is chosen", async () => {
    const wrapper = mount(VYearPicker, options)
    const btns = wrapper.findAll("button")
    await btns[1].trigger("click")
    expect(wrapper.emitted("update:modelValue")).toEqual([[2022]])
  })

  it("displays only the number of years specified", async () => {
    const wrapper = mount(VYearPicker, {
      ...options,
      props: {
        ...options.props,
        maxYearsToDisplay: 3,
      },
    })
    expect(wrapper.findAll("button").length).toEqual(3)
  })
})
