import { mount } from "@vue/test-utils"
import VTextarea from "@/components/_library/forms/VTextarea"

describe("VTextarea", () => {
  it("should render a textarea with id", () => {
    const wrapper = mount(VTextarea, {
      props: { id: "test-input" },
    })
    expect(wrapper.find('[id="test-input"]').exists()).toBe(true)
  })
  it("should render a label with matching id", () => {
    const wrapper = mount(VTextarea, {
      props: { id: "test-input" },
    })
    expect(wrapper.find('[for="test-input"]').exists()).toBe(true)
  })

  describe("When `autoGrow` prop is true", () => {
    it("should increase `rows` to fit content", () => {
      const wrapper = mount(VTextarea, {
        props: {
          modelValue: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor accumsan velit ac faucibus. Curabitur luctus, felis eu placerat suscipit, leo magna gravida lectus, non volutpat lacus nibh sed risus. Nulla eget sapien dignissim erat fringilla pretium. Proin aliquam accumsan dolor. Integer feugiat malesuada vehicula. Quisque lacinia vestibulum vehicula. Sed euismod aliquet tellus, nec rutrum velit ultrices at. Nulla ex ipsum, hendrerit sed mauris eget, faucibus malesuada est. Pellentesque vel nisi vel eros tempus feugiat.`,
          autoGrow: true,
          rows: 2,
        },
      })

      const textarea = wrapper.find("textarea")
      expect(textarea.element.rows).not.toBe(2)
    })
  })

  describe("When `readonly` prop is `true`", () => {
    it("should set input readonly to `true`", () => {
      const wrapper = mount(VTextarea, {
        props: { readonly: true },
      })

      const input = wrapper.find('[readonly=""]')
      expect(input.exists()).toBe(true)
    })
    it("should remove border styles", () => {
      const wrapper = mount(VTextarea, {
        props: { readonly: true },
      })

      const input = wrapper.find("textarea")
      expect(input.classes()).toContain("border-transparent")
    })
  })
})
