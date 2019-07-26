<template>
  <svg
    ref="svgRef"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 256 256"
    style="enable-background:new 0 0 256 256;"
    xml:space="preserve"
  >
    <g v-html="svg"></g>
    <image
      ref="imageRef"
      style="overflow:hidden;"
      x="50%"
      y="50%"
      :width="logoSize"
      :height="logoSize"
      :xlink:href="logo"
      :transform="logoTranslate"
    ></image>
  </svg>
</template>

<script>
import Vue from "vue";
import QRCode from "qrcode-svg";

export default Vue.extend({
  name: "QRSvg",
  props: {
    url: String,
    color: String,
    logo: String
  },
  computed: {
    qrCode() {
      if (!this.url) {
        return;
      }
      return new QRCode({
        content: this.url,
        padding: 1,
        color: this.color
      });
    },
    logoSize() {
      const qrViewBox = 256;
      if (this.url) {
        const urlLength = this.url.length;
        if (urlLength < 12) {
          return Math.round(qrViewBox * 0.24);
        }
        if (urlLength < 24) {
          return Math.round(qrViewBox * 0.2);
        }
        if (urlLength < 40) {
          return Math.round(qrViewBox * 0.18);
        }
        if (urlLength < 60) {
          return Math.round(qrViewBox * 0.24);
        }
        return Math.round(qrViewBox * 0.3);
      }
      return 0;
    },
    logoTranslate() {
      return `translate(-${this.logoSize / 2},-${this.logoSize / 2})`;
    },
    svg() {
      if (this.qrCode) {
        const svgString = this.qrCode.svg();
        return svgString;
      }
      return "";
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
