<template>
  <div>
    <QRSvg
      ref="qrSvg"
      :url="url"
      :color="color"
      :logo="logo"
      style="width: 256px; height: 256px;"
      v-show="!showResize"
    />
    <div ref="frameContainer" class="frame--container">
      <img ref="frameRef" :src="frame" alt="" />
      <VueDragResize
        v-if="showResize"
        parentLimitation
        aspectRatio
        :w="256"
        :h="256"
        @resizing="resize"
        @dragging="resize"
      >
        <!-- <QRSvg :url="url" :color="color" :logo="logo" /> -->
        <img ref="qrRef" :src="svgBlob" alt="" v-show="true" />
      </VueDragResize>
    </div>
    <canvas ref="canvasRef" v-show="false" />
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
      showResize: false,
      width: 256,
      height: 256,
      top: 0,
      left: 0
    };
  },
  computed: {
    svgBlob() {
      if (!this.$refs.qrSvg) {
        return "";
      }
      return this.$refs.qrSvg.svgBlob;
    }
  },
  methods: {
    doSave(item, name) {
      this.$refs.downloadLink.href = item;
      this.$refs.downloadLink.download = name;
      this.$refs.downloadLink.click();
    },
    saveSvg() {
      this.doSave(this.svgBlob, "qr-code.svg");
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
    saveCanvas() {
      const canvas = this.$refs.canvasRef;
      const frame = this.$refs.frameRef;
      const frameW = this.$refs.frameContainer.offsetWidth;
      const frameH = this.$refs.frameContainer.offsetHeight;
      canvas.width = frameW;
      canvas.height = frameH;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(frame, 0, 0, frameW, frameH);
      ctx.drawImage(
        this.$refs.qrRef,
        this.left,
        this.top,
        this.width,
        this.height
      );
      const png = canvas.toDataURL("image/png");
      this.doSave(png, "qr-code.png");
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
