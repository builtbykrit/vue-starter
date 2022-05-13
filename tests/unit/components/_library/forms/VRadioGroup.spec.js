import { mount } from "@vue/test-utils"
import VRadioGroup from "@/components/_library/forms/VRadioGroup"
import { RadioGroupOption } from "@headlessui/vue"

describe("VRadioGroup", () => {
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
