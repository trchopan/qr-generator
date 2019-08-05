<template>
  <svg
    ref="svgRef"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 256 256"
    style="enable-background:new 0 0 256 256;"
    xml:space="preserve"
  >
    <g v-html="svg"></g>
    <g v-if="logo">
      <rect
        x="50%"
        y="50%"
        :width="logoSize"
        :height="logoSize"
        style="fill:#ffffff"
        :transform="translateRect"
      ></rect>
      <image
        style="overflow:hidden;"
        x="50%"
        y="50%"
        :width="logoSize - 5"
        :height="logoSize - 5"
        :xlink:href="logo"
        :transform="translateLogo"
      ></image>
    </g>
  </svg>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "CombinedSvg",
  props: {
    urlLength: Number,
    svg: String,
    color: String,
    logo: String
  },
  computed: {
    logoSize() {
      const qrViewBox = 256;
      const thresholds = [
        { limit: 12, multiplier: 0.24 },
        { limit: 24, multiplier: 0.2 },
        { limit: 40, multiplier: 0.18 },
        { limit: 60, multiplier: 0.24 }
      ];
      if (this.urlLength) {
        const found = thresholds.find(
          threshold => this.urlLength < threshold.limit
        );
        const multiplier = found ? found.multiplier : 0.3;
        return multiplier * qrViewBox;
      }
      return 0;
    },
    translateRect() {
      const halfSize = this.logoSize / 2;
      return `translate(-${halfSize},-${halfSize})`;
    },
    translateLogo() {
      const halfSize = this.logoSize / 2;
      return `translate(-${halfSize - 2.5},-${halfSize - 2.5})`;
    },
    svgBlob() {
      const svg = new XMLSerializer().serializeToString(this.$refs.svgRef);
      const svgBlob = new Blob([svg], {
        type: "image/svg+xml;charset=utf-8"
      });
      const DOMURL = self.URL || self.webkitURL || self;
      return DOMURL.createObjectURL(svgBlob);
    }
  }
});
</script>
