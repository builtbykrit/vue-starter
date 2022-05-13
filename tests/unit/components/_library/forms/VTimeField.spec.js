import { mount } from "@vue/test-utils"
import VTimeField from "@/components/_library/forms/VTimeField"

describe("VTimeField", () => {
  it("should render an input with id", () => {
    const wrapper = mount(VTimeField, {
      props: { id: "test-input" },
    })

    expect(wrapper.find('[id="test-input"]').exists()).toBe(true)
  })
  it("should render a label with matching id", () => {
    const wrapper = mount(VTimeField, {
      props: { id: "test-input" },
    })

    expect(wrapper.find('[for="test-input"]').exists()).toBe(true)
  })
  it("should emit `update:modelValue` on input blur", async () => {
    const wrapper = mount(VTimeField, { props: { modelValue: "01:00" } })

    const input = wrapper.find("input")
    await input.setValue("1p")
    await input.trigger("blur")

    expect(wrapper.emitted("update:modelValue")[0][0]).toBe("13:00")
  })

  describe("When `readonly` prop is `true`", () => {
    it("should set input readonly to `true`", () => {
      const wrapper = mount(VTimeField, {
        props: { readonly: true },
      })

      const input = wrapper.find('[readonly=""]')
      expect(input.exists()).toBe(true)
    })
    it("should remove border styles", () => {
      const wrapper = mount(VTimeField, {
        props: { readonly: true },
      })

      const input = wrapper.find("input")
      expect(input.classes()).toContain("border-transparent")
    })
  })
})
