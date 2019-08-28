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
    <g v-html="svg" />
    <g v-if="logo">
      <rect
        x="50%"
        y="50%"
        :width="logoSize"
        :height="logoSize"
        style="fill:#ffffff"
        :transform="translateRect"
      />
      <image
        style="overflow:hidden;"
        x="50%"
        y="50%"
        :width="logoSize - 5"
        :height="logoSize - 5"
        :xlink:href="logo"
        :transform="translateLogo"
      />
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
        { lim: 17, mul: 0.218 },
        { lim: 32, mul: 0.26 },
        { lim: 53, mul: 0.291 },
        { lim: 78, mul: 0.201 },
        { lim: 106, mul: 0.18 },
        { lim: 134, mul: 0.209 },
        { lim: 155, mul: 0.234 },
        { lim: 192, mul: 0.256 },
        { lim: 230, mul: 0.239 },
        { lim: 271, mul: 0.239 }
      ];
      if (this.urlLength) {
        const found = thresholds.find(
          threshold => this.urlLength <= threshold.lim
        );
        const mul = found ? found.mul : 0.27;
        return mul * qrViewBox;
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
