import { ref, watch } from "vue"

export function useValidation(validation) {
  let hasError = ref(false)
  let errorMessages = ref([])

  const updateValidation = () => {
    hasError.value = validation.$error
    errorMessages.value = validation.$errors.map((error) => error.$message)
  }

  // On mounted, update validation
  updateValidation()
  // On change, update validation
  watch(() => validation, updateValidation, { deep: true })

  return { hasError, errorMessages }
}
