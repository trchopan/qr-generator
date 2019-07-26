<template>
  <div class="frame--container">
    <div class="img--container">
      <img ref="imgRef" :src="frame" alt="" />
    </div>
    <QRSvg
      v-if="!frame"
      ref="qrSvg"
      :url="url"
      :color="color"
      :logo="logo"
      style="width: 256px; height: 256px;"
    />
    <VueDragResize
      v-if="showResize"
      parentLimitation
      aspectRatio
      :w="256"
      :h="256"
      @resizing="resize"
      @dragging="resize"
    >
      <QRSvg ref="qrSvg" :url="url" :color="color" :logo="logo" />
    </VueDragResize>
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
    frame: String,
    url: String,
    color: String,
    logo: String
  },
  data() {
    return {
      showResize: false
    };
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
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    }
  },
  watch: {
    frame(newVal) {
      if (newVal) {
        this.showResize = false;
        setTimeout(() => {
          this.showResize = true;
        }, 500);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.frame--container {
  position: relative;
}
</style>
