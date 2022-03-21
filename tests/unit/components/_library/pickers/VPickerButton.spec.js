import VPickerButton from "@/components/_library/forms/pickers/VPickerButton.vue"
import { mount } from "@vue/test-utils"

describe("VPickerButton", () => {
  it("can be disabled", async () => {
    const wrapper = mount(VPickerButton)
    expect(wrapper.element.disabled).toBeFalsy()
    await wrapper.setProps({ disabled: true })
    expect(wrapper.element.disabled).toBeTruthy()
  })

  it("can be selected", async () => {
    const wrapper = mount(VPickerButton)
    expect(wrapper.classes()).not.toContain("selected")
    await wrapper.setProps({ selected: true })
    expect(wrapper.classes()).toContain("selected")
  })

  it("styles the first of a set differently", async () => {
    const wrapper = mount(VPickerButton)
    expect(wrapper.classes()).not.toContain("first")
    expect(wrapper.classes()).toContain("rounded")
    await wrapper.setProps({ firstOfSet: true, oneOfSet: true })
    expect(wrapper.classes()).toContain("first")
    expect(wrapper.classes()).not.toContain("rounded")
  })

  it("styles the last of a set differently", async () => {
    const wrapper = mount(VPickerButton)
    expect(wrapper.classes()).not.toContain("last")
    expect(wrapper.classes()).toContain("rounded")
    await wrapper.setProps({ lastOfSet: true, oneOfSet: true })
    expect(wrapper.classes()).toContain("last")
    expect(wrapper.classes()).not.toContain("rounded")
  })

  it("styles the entire set when hovered", async () => {
    const wrapper = mount(VPickerButton)
    expect(wrapper.classes()).not.toContain("group-hover")
    await wrapper.setProps({ setIsHovered: true, oneOfSet: true })
    expect(wrapper.classes()).toContain("group-hover")
  })
})
