import Vue from "vue";
import App from "./App.vue";
import VueDragResize from "vue-drag-resize";

Vue.config.productionTip = false;
Vue.component("VueDragResize", VueDragResize);

new Vue({
  render: h => h(App)
}).$mount("#app");
