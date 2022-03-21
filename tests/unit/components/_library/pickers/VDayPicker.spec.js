import VDayPicker from "@/components/_library/forms/pickers/VDayPicker.vue"
import { mount } from "@vue/test-utils"

describe("VDayPicker", () => {
  const options = {
    props: {
      modelValue: "2022-05-01",
    },
  }

  it("emits when a day is selected", async () => {
    const wrapper = mount(VDayPicker, options)
    const btns = wrapper.findAll("button")
    await btns[11].trigger("click")
    expect(wrapper.emitted("update:modelValue")).toBeTruthy()
  })

  it("can optionally select a full week", async () => {
    const wrapper = mount(VDayPicker, {
      ...options,
      props: {
        ...options.props,
        week: true,
      },
    })
    await wrapper.find("li > button").trigger("click")
    expect(wrapper.findAll(".selected").length).toEqual(7)
  })
})
