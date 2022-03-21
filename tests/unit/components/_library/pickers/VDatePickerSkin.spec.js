import VDatePickerSkin from "@/components/_library/forms/pickers/VDatePickerSkin.vue"
import { mount } from "@vue/test-utils"

describe("VDatePickerSkin", () => {
  const options = {
    props: {
      titleText: "Hello world!",
    },
    slots: {
      default: "I'm a picker!",
    },
  }

  it("renders title text", () => {
    const wrapper = mount(VDatePickerSkin, options)
    expect(wrapper.text()).toContain("Hello world!")
  })

  it("renders slotted content", () => {
    const wrapper = mount(VDatePickerSkin, options)
    expect(wrapper.text()).toContain("I'm a picker!")
  })

  it("displays the previous button only when enabled", async () => {
    const wrapper = mount(VDatePickerSkin, options)
    expect(wrapper.find("[data-cy=picker-btn-prev]").exists()).toBeFalsy()
    await wrapper.setProps({ canGoBack: true })
    expect(wrapper.find("[data-cy=picker-btn-prev]").exists()).toBeTruthy()
  })

  it("displays the next button only when enabled", async () => {
    const wrapper = mount(VDatePickerSkin, options)
    expect(wrapper.find("[data-cy=picker-btn-next]").exists()).toBeFalsy()
    await wrapper.setProps({ canGoForward: true })
    expect(wrapper.find("[data-cy=picker-btn-next]").exists()).toBeTruthy()
  })
})
