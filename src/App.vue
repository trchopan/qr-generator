<template>
  <div id="app">
    <LinkInputForm @url="handleUrlEmit" />
    <div v-html="qrCodeResult"></div>
  </div>
</template>

<script>
import LinkInputForm from "./components/LinkInputForm.vue";
import QRCode from "qrcode-svg";

export default {
  name: "app",
  components: {
    LinkInputForm
  },
  data() {
    return {
      qrCodeResult: ""
    };
  },
  methods: {
    handleUrlEmit(url) {
      const svg = new QRCode({
        content: url
      }).svg();
      this.qrCodeResult = svg;
    }
  }
};
</script>

<style lang="scss">
@import "~normalize.css/normalize.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
