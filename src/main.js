import Vue from "vue";
import App from "./App.vue";
import VueDragResize from "vue-drag-resize";

Vue.config.productionTip = false;
Vue.component("VueDragResize", VueDragResize);

Vue.mixin({
  methods: {
    l: function(key) {
      return window.label[key];
    }
  }
});

let defaultLanguage = "en";

const xhr = new XMLHttpRequest();
xhr.onload = () => {
  window.label = JSON.parse(xhr.response);
  new Vue({
    render: h => h(App)
  }).$mount("#app");
};
xhr.open("GET", `languages/${defaultLanguage}.json`);
xhr.responseType = "application/json";
xhr.send();
