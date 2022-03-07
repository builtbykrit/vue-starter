import { mount } from "@vue/test-utils"
import VRadioGroup from "@/components/_library/formControls/VRadioGroup"
import { RadioGroupOption } from "@headlessui/vue"

describe("VRadioGroup", () => {
  it("should render an input with id", () => {
    const wrapper = mount(VRadioGroup, {
      props: { id: "test-input", items: [] },
    })

    expect(wrapper.find('[id="test-input"]').exists()).toBe(true)
  })
  it("should render children items", () => {
    const wrapper = mount(VRadioGroup, {
      props: {
        id: "test-input",
        items: [
          { text: "Test Item 1", value: "test-1" },
          { text: "Test Item 2", value: "test-2" },
        ],
      },
    })

    expect(wrapper.findAllComponents(RadioGroupOption).length).toBe(2)
  })
})
