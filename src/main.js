import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

const app = createApp(App);
app.use(store); // Vuex Store'u kullanıma al
app.mount("#app");
