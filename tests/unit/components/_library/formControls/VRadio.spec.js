import { mount } from "@vue/test-utils"
import VRadio from "@/components/_library/formControls/VRadio"

describe("VRadio", () => {
  it("should render an input with id", () => {
    const wrapper = mount(VRadio, {
      props: { id: "test-input" },
    })

    expect(wrapper.find('[id="test-input"]').exists()).toBe(true)
  })
  it("should render a label with matching id", () => {
    const wrapper = mount(VRadio, {
      props: { id: "test-input" },
    })

    expect(wrapper.find('[for="test-input"]').exists()).toBe(true)
  })

  describe("When `readonly` prop is `true`", () => {
    it("should set input disabled to `true`", () => {
      const wrapper = mount(VRadio, {
        props: { id: "test-input", readonly: true },
      })

      const input = wrapper.find('[disabled=""]')
      expect(input.exists()).toBe(true)
    })
  })
})
