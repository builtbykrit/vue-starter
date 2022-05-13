import { mount } from "@vue/test-utils"
import VSwitch from "@/components/_library/forms/VSwitch"

describe("VSwitch", () => {
  it("should render a label with matching id", () => {
    const wrapper = mount(VSwitch, {
      props: { id: "test-input" },
    })

    expect(wrapper.find('[for="test-input"]').exists()).toBe(true)
  })
})
