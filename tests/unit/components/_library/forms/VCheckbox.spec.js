import { mount } from "@vue/test-utils"
import VCheckbox from "@/components/_library/forms/VCheckbox"

describe("VCheckbox", () => {
  it("should render an input with id", () => {
    const wrapper = mount(VCheckbox, {
      props: { id: "test-input" },
    })

    expect(wrapper.find('[id="test-input"]').exists()).toBe(true)
  })
  it("should render a label with matching id", () => {
    const wrapper = mount(VCheckbox, {
      props: { id: "test-input" },
    })

    expect(wrapper.find('[for="test-input"]').exists()).toBe(true)
  })

  describe("When `readonly` prop is `true`", () => {
    it("should set input disabled to `true`", () => {
      const wrapper = mount(VCheckbox, {
        props: { id: "test-input", readonly: true },
      })

      const input = wrapper.find('[disabled=""]')
      expect(input.exists()).toBe(true)
    })
  })
})
