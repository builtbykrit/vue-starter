import HelloWorld from "@/components/HelloWorld.vue"
import { mount } from "@vue/test-utils"

describe("HelloWorld", () => {
  it("displays the message", () => {
    const msg = "This is a test message"
    const wrapper = mount(HelloWorld, {
      props: {
        msg,
      },
    })
    expect(wrapper.find("h1").text()).toStrictEqual(msg)
  })
})
