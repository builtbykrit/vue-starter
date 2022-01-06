# Vue Starter

This template should help get you started developing with a Vue web app.

## Getting started

To run this project locally:
```shell
npm install
npm run dev
```

## Stack

| Tooling  | Purpose
| -------- | -------
| Vue      | Frontend framework
| Vite     | Build tool
| Vuex     | State management
| Axios    | HTTP client
| Routing  | Vue Router
| Tailwind | Styling
| Sentry   | Logging

### Build tool

- Why [Vite](https://vitejs.dev/):
  1. It's much faster than Webpack
- ⚠️ Warning: Verify that dependencies are compatible with Vite before forking this project.


### Frontend framework

- Prefix component names with 'V' (e.g. `VButton.vue`)
- Store Views in a separate directory from Components.
- The template uses the `<script setup>` syntactic sugar for brevity. Check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more or see below for an example:

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

### Styling
- ⚠️ This starter template uses Tailwind v3 which is still in beta
- Why Tailwind:
  1. Utility classes provide consistent styling
  2. Faster to implement: no need to write CSS
  3. Easily purchase unused CSS

### State management

- When to use a store:
  1. To persist data, such as current User and authentication data, between views or sessions.
  2. As a global event listener. For example, when an Alert is generated that must be displayed by the Toaster.
- Why [Vuex](https://vuex.vuejs.org/) was chosen:
  1. Enable visibility when using Vue Developer Tools
  2. Persist data beyond the current session
  3. Obfuscate sensitive data stored locally

### HTTP client

- Avoid calling Axios directly from the API. Instead, create abstracted HTTP client connections for re-usability.
- Define interceptors separately from HTTP client connections for re-usability and testability
- Use environment variables for defining the base URLs of APIs.
- When the current User is authenticated, automatically inject authorization data into HTTP requests using an interceptor.
- When an HTTP request fails, automatically log the error event.

### API

- Use a consistent naming convention
  - `POST`: create
  - `GET`: find (one record) or list (multiple records)
  - `DELETE`: remove (delete is a reserved word)
  - `PATCH`: update
  - `PUT`: replace
- Create separate modules for each data type.
- Intercept and rewrite error messages so that they are User-friendly.
- Group error messages in a constant (enum-like object) so that the text can be changed without modifying other code.

### Routing

- Why [Vue Router](https://router.vuejs.org/)
  1. Mature, popular, and official router of Vue
- Group route names in a constant (enum-like object) so you don't have to remember them. Plus, they'll automatically update when changed.
- Group page titles in a constant (enum-like object) so that the text can be changed without modifying other code.

### Authentication

- This starter template includes tested functionality for managing User and Token data in global state. See the `/store` directory for implementation details.

### Notifications

- This starter template includes tested functionality for managing Notification data in global state. See `/modules/notification` and the `/store` directory for implementation details.

### Logging

- The logging service ([Sentry](https://sentry.io)) is abstracted for portability.
- Only events occurring in `staging` and `production` environments are sent to the logging service. Events occurring in `development` environments are simply logged to the console.
- When User data exists, it is bound to logged events.

### Testing

- Why write tests:
  1. Better code reliability
  2. Fosters good code quality
  3. Documents which use cases have been considered
- Why [Jest](https://jestjs.io/) for unit testing:
  1. Tests run faster (no need to start Cypress first)
  2. Popular, mature unit testing library
- Why [Cypress](https://www.cypress.io/) for E2E testing:
  1. Runs tests in the browser
- Store reusable mocked data for use in tests. For example, store a mock User that can be used for any tests requiring a User.

### Linting

- Noteworthy linting rules:
  - Double quotes: chosen so that apostrophe's don't have to be escaped
  - No semicolons at the end of statements because they are unnecessary

### Version control

- Branches for new features and bug fixes should be branched off of `main`.
- `main` should be the working branch that accepts merges of features, bugs ,etc.
- Create a `stable/{release}` branch for deploying code to `production` environments.
- Commit a `.env.sample` file containing a list of the project's environment variables (without values) to VCS.
- Store environment variables in Krit's [LastPass](https://www.lastpass.com/) account. This way, they are securely stored but accessible to other Krit engineers.

### CI/CD

- Why [Github Actions](https://github.com/features/actions):
  1. Seamless integration with Github
- Utilize [Dependabot](https://github.com/dependabot) to mitigate security risks and keep dependencies up-to-date
- ⚠️ Always test dependencies updates before committing to an updated version.
- Require that tests to pass before allowing pull requests to be merged. This functionality exists out-of-the-box in this starter template.
- Use [Act](https://github.com/nektos/act) to test Github Actions locally 







