import { mount } from "@vue/test-utils"
import VTextField from "@/components/_library/forms/VTextField.vue"

describe("VTextField", () => {
  it("should render an input with id", () => {
    const wrapper = mount(VTextField, {
      props: { id: "test-input" },
    })

    expect(wrapper.find('[id="test-input"]').exists()).toBe(true)
  })
  it("should render a label with matching id", () => {
    const wrapper = mount(VTextField, {
      props: { id: "test-input" },
    })

    expect(wrapper.find('[for="test-input"]').exists()).toBe(true)
  })
  it("should render a text input by default", () => {
    const wrapper = mount(VTextField)

    const input = wrapper.find("input")
    expect(input.element.type).toBe("text")
  })
  it("should emit `update:modelValue` on input", async () => {
    const wrapper = mount(VTextField)

    const input = wrapper.find("input")
    await input.setValue("Test input")

    expect(wrapper.emitted("update:modelValue")[0][0]).toBe("Test input")
  })

  describe("When `type` prop is `number`", () => {
    it("should render a number input", () => {
      const wrapper = mount(VTextField, {
        props: { type: "number" },
      })

      const input = wrapper.find("input")
      expect(input.element.type).toBe("number")
    })
    it("should change the input step when `step` prop is changed", async () => {
      const wrapper = mount(VTextField, {
        props: { type: "number", modelValue: 0, step: 0.5 },
      })

      expect(wrapper.find('[step="0.5"]').exists()).toBe(true)
    })
  })

  describe("When `type` prop is `password`", () => {
    it("should render a password input", () => {
      const wrapper = mount(VTextField, {
        props: { type: "password" },
      })

      const input = wrapper.find("input")
      expect(input.element.type).toBe("password")
    })
    it("should render a 'showPassword' toggle", () => {
      const wrapper = mount(VTextField, {
        props: { type: "password" },
      })

      const passwordToggle = wrapper.find('[data-cy="passwordToggle"]')
      expect(passwordToggle).toBeTruthy()
    })
    it("should change input type when 'showPassword' toggle is clicked", async () => {
      const wrapper = mount(VTextField, {
        props: { type: "password" },
      })

      const input = wrapper.find("input")
      expect(input.element.type).toBe("password")

      const passwordToggle = wrapper.find('[data-cy="passwordToggle"]')
      await passwordToggle.trigger("click")
      expect(input.element.type).toBe("text")
    })
  })

  describe("When `readonly` prop is `true`", () => {
    it("should set input readonly to `true`", () => {
      const wrapper = mount(VTextField, {
        props: { readonly: true },
      })

      const input = wrapper.find('[readonly=""]')
      expect(input.exists()).toBe(true)
    })
    it("should remove border styles", () => {
      const wrapper = mount(VTextField, {
        props: { readonly: true },
      })

      const input = wrapper.find("input")
      expect(input.classes()).toContain("border-transparent")
    })
  })
})
