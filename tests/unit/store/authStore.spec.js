import { createPinia, setActivePinia } from "pinia"
import { useAuthStore } from "@/store/authStore"

describe("authStore", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it("should create a store", () => {
    const authStore = useAuthStore()
    expect(authStore).toBeDefined()
  })
})
