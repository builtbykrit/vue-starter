import { mount } from "@vue/test-utils"
import VAutocomplete from "@/components/_library/forms/VAutocomplete"
import { Combobox, ComboboxInput } from "@headlessui/vue"

describe("VAutocomplete", () => {
  it("should render an input with id", () => {
    const wrapper = mount(VAutocomplete, {
      props: { id: "test-input", items: [] },
    })

    expect(wrapper.find('[id="test-input"]').exists()).toBe(true)
  })
  it("should render a label with matching id", () => {
    const wrapper = mount(VAutocomplete, {
      props: { id: "test-input", items: [] },
    })

    expect(wrapper.find('[for="test-input"]').exists()).toBe(true)
  })

  describe("When `readonly` prop is `true`", () => {
    it("should set input readonly to `true`", () => {
      const wrapper = mount(VAutocomplete, {
        props: { id: "test-input", readonly: true, items: [] },
      })

      const combobox = wrapper.findComponent(Combobox)
      expect(combobox.vm.disabled).toBe(true)
    })
    it("should remove border styles", () => {
      const wrapper = mount(VAutocomplete, {
        props: { readonly: true, items: [] },
      })

      const combobox = wrapper.findComponent(ComboboxInput)
      expect(combobox.classes()).toContain("border-transparent")
    })
  })
})
