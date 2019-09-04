import Vue from "vue";
import App from "./App.vue";
import VueDragResize from "vue-drag-resize";

Vue.config.productionTip = false;
Vue.component("VueDragResize", VueDragResize);

Vue.mixin({
  methods: {
    l: function(key) {
      const paths = key.split(".");
      let result = window.label;
      for (let i of paths) {
        result = result && result[i];
      }
      return result;
    }
  }
});

let defaultLanguage = "en_US";

const xhr = new XMLHttpRequest();
xhr.onload = () => {
  window.label = JSON.parse(xhr.response);
  new Vue({
    render: h => h(App)
  }).$mount("#app");
};
xhr.open("GET", `languages/${defaultLanguage}.json`);
xhr.send();
