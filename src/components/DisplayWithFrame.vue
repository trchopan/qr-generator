<template>
  <div class="frame--container">
    <div class="img--container">
      <img :src="frame" alt="" />
    </div>
    <div class="svg--container" :style="svgStyle">
      <slot />
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "DisplayWithFrame",
  props: {
    frame: String,
    qrSize: Number,
    qrTop: Number,
    qrLeft: Number
  },
  computed: {
    svgStyle() {
      return {
        width: this.qrSize + "%",
        top: this.qrTop + "%",
        left: this.qrLeft + "%"
      };
    }
  }
});
</script>

<style lang="scss" scoped>
.frame--container {
  position: relative;
}
.svg--container {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
