<template>
  <div id="app">
    <LinkInputForm @output="output = $event" />
  </div>
</template>

<script>
import LinkInputForm from "./components/LinkInputForm.vue";

export default {
  name: "app",
  components: {
    LinkInputForm
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
@import "assets/css/app.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
