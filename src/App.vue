<template>
  <div id="app">
    <LinkInputForm @output="output = $event" />
    <DisplayQRSvg :input="output" />
  </div>
</template>

<script>
import LinkInputForm from "./components/LinkInputForm.vue";
import DisplayQRSvg from "./components/DisplayQRSvg.vue";

export default {
  name: "app",
  components: {
    LinkInputForm,
    DisplayQRSvg
  },
  data() {
    return {
      output: {}
    };
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
