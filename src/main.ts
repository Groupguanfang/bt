import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import "vfonts/Lato.css";
import "vfonts/FiraCode.css";

const app = createApp(App);

app.use(createPinia().use(piniaPersist));
app.use(router);

app.mount("#app");
