import Vue from "vue";
import App from "./App.vue";
import { myMixin } from "./mixins";

Vue.config.productionTip = false;
Vue.mixin(myMixin);

new Vue({
  render: h => h(App)
}).$mount("#app");
