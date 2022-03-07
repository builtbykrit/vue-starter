import { mount } from "@vue/test-utils"
import VSwitch from "@/components/_library/formControls/VSwitch"

describe("VSwitch", () => {
  it("should render an input with id", () => {
    const wrapper = mount(VSwitch, {
      props: { id: "test-input" },
    })

    expect(wrapper.find('[id="test-input"]').exists()).toBe(true)
  })
  it("should render a label with matching id", () => {
    const wrapper = mount(VSwitch, {
      props: { id: "test-input" },
    })

    expect(wrapper.find('[for="test-input"]').exists()).toBe(true)
  })
})
