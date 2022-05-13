import { useValidation } from "@/composables/useValidation"
import { reactive } from "vue"

describe("useValidation", () => {
  it("parses vuelidate validation", () => {
    const vuelidation = reactive({
      $error: true,
      $errors: [{ $message: "error" }],
    })
    const { hasError, errorMessages } = useValidation(vuelidation)

    expect(hasError.value).toBe(true)
    expect(errorMessages.value).toEqual(["error"])
  })
})
