<template>
  <div class="qr--container">
    <QRSvg ref="qrSvg" :url="url" :color="color" :logoBase64="logoBase64" />
    <canvas ref="qrCanvas" width="256" height="256" v-show="false"></canvas>
    <a ref="downloadLink" v-show="false"></a>
  </div>
</template>

<script>
import Vue from "vue";
import QRSvg from "./QRSvg";

export default Vue.extend({
  name: "DisplayQRSvg",
  components: {
    QRSvg
  },
  props: {
    url: String,
    color: String,
    logoBase64: String
  },
  methods: {
    doSave(item, name) {
      this.$refs.downloadLink.href = item;
      this.$refs.downloadLink.download = name;
      this.$refs.downloadLink.click();
    },
    saveSvg() {
      this.doSave(this.$refs.qrSvg.svgBlob, "qr-code.svg");
    },
    savePng() {
      const img = new Image();
      const canvas = this.$refs.qrCanvas;
      const ctx = canvas.getContext("2d");
      const DOMURL = self.URL || self.webkitURL || self;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const png = canvas.toDataURL("image/png");
        DOMURL.revokeObjectURL(png);
        this.doSave(png, "qr-code.png");
      };
      img.src = this.$refs.qrSvg.svgBlob;
    }
  }
});
</script>

<style lang="scss">
.qr--container {
  margin: auto;
  width: 256px;
  height: 256px;
}
</style>
