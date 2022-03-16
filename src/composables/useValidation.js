import { ref, watch } from "vue"

export function useValidation(validation) {
  let hasError = ref(false)
  let errorMessages = ref([])

  watch(
    () => validation,
    () => {
      hasError.value = validation.$error
      errorMessages.value = validation.$errors.map((error) => error.$message)
    },
    { deep: true }
  )

  return { hasError, errorMessages }
}
