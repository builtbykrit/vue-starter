import { createApp } from "vue"
import logger from "./modules/logger"
import router from "./router"
import { createPinia } from "pinia"
import App from "./App.vue"
import "./styles/index.css"

const app = createApp(App)
logger.init(app, router)
app.use(router).use(createPinia).mount("#app")
