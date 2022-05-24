import { mount } from "@vue/test-utils"
import VOtpField from "@/components/_library/forms/VOtp/VOtpField"

describe("VOtpField", () => {
  it("should render an input with id", () => {
    const wrapper = mount(VOtpField, {
      props: { id: "test-input" },
    })
    expect(wrapper.find('[id="test-input"]').exists()).toBe(true)
  })
})
