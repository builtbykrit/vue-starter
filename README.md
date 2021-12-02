# Vue Starter

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### Tooling

| Tooling | Purpose
| ------- | -------
| Vite    | Build tool
| Vuex    | State management
| Axios   | HTTP client
| Routing | Vue Router
| Styling | Tailwind
| Sentry  | Logging

## Best Practices

### Components

- Prefix component names with 'v' (e.g. `vButton.vue`)
- Store Views separately from Components
- Write components using the `<script setup>` syntactic sugar for brevity. Example:

```vue
<script setup>
import { ref } from "@vue/reactivity"

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
})

const state = ref({
  isLoading: false,
})
</script>

<template>
  <button>
    {{ state.isLoading ? "Loading..." : props.message }}
  </button>
</template>
```

### State management

- Only data which persists between views, such as current User and authentication data, needs to be stored in global state.
- Vuex was used to:
  1. Enable visibility when using Vue Developer Tools
  2. Persist data beyond the current session
  3. Obfuscate sensitive data stored locally
- HTTP requests can be made by calling API functions directly. Passing these requests through Vuex Actions is typically unnecessary.

### HTTP client

- Create HTTP client connections for re-usability.
- Define interceptors separately from HTTP client connections for re-usability and testability
- Use environment variables for defining the base URLs of APIs.
- When the current User is authenticated, automatically inject it to HTTP requests using an interceptor.
- When an HTTP request fails, automatically log the event.

### API

- Use a consistent naming convention
  - `POST`: create
  - `GET`: find (one record) or list (multiple records)
  - `DELETE`: remove (delete is a reserved word)
  - `PATCH`: update
  - `PUT`: replace
- Create separate modules for each data type
- Intercept and rewrite error messages so that they are User-friendly.
- Group error messages in a constant (object) so that the text can be changed without modifying other code.

### Routing

- Group route names in a separate configuration object so you don't have to remember them. Plus, they'll automatically update when changed.
- Group page titles in a constant (object) so that the text can be changed without modifying other code.

### Logging

- The logging service (Sentry) is wrapped for portability.
- Only events occurring in `staging` and `production` environments are sent to the logging service. Events occurring in `development` environments are simply logged to the console.
- When User data exists, it is bound to logged events.

### Testing

### DevOps

- 
- Noteworthy linting rules:
  - Double quotes: so that apostrophe's don't have to be escaped
  - No semicolons at the end of statements because they are unnecessary
- Create a `.env.sample` file containing a list of the project's environment variables.
- Store environment variables in LastPass so they are accessible to other Krit engineers.
- Commit changes to the `main` branch. 
