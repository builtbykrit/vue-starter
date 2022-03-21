import { mount } from "@vue/test-utils"
import VSelect from "@/components/_library/forms/VSelect"
import { Listbox, ListboxButton } from "@headlessui/vue"

describe("VSelect", () => {
  it("should render an input with id", () => {
    const wrapper = mount(VSelect, {
      props: { id: "test-input", items: [] },
    })

    expect(wrapper.find('[id="test-input"]').exists()).toBe(true)
  })
  it("should render a label with matching id", () => {
    const wrapper = mount(VSelect, {
      props: { id: "test-input", items: [] },
    })

    expect(wrapper.find('[for="test-input"]').exists()).toBe(true)
  })

  describe("When `readonly` prop is `true`", () => {
    it("should set input readonly to `true`", () => {
      const wrapper = mount(VSelect, {
        props: { id: "test-input", readonly: true, items: [] },
      })

      const listbox = wrapper.findComponent(Listbox)
      expect(listbox.vm.disabled).toBe(true)
    })
    it("should remove border styles", () => {
      const wrapper = mount(VSelect, {
        props: { readonly: true, items: [] },
      })

      const listbox = wrapper.findComponent(ListboxButton)
      expect(listbox.classes()).toContain("border-transparent")
    })
  })
})
