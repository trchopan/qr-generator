<template>
  <div>
    <div ref="frameContainer" class="frame--container">
      <img ref="frameRef" :src="frame" alt />
      <VueDragResize
        v-if="showSvg"
        parentLimitation
        aspectRatio
        :w="size"
        :h="size"
        @resizing="resize"
        @dragging="resize"
      >
        <CombinedSvg ref="qrSvg" :urlLength="url.length" :svg="svg" :color="color" :logo="logo" />
      </VueDragResize>
    </div>
    <canvas ref="canvasRef" v-show="false" />
    <a ref="downloadLink" v-show="false"></a>
  </div>
</template>

<script>
import Vue from "vue";
import CombinedSvg from "./CombinedSvg";

export default Vue.extend({
  name: "DisplayQRSvg",
  components: {
    CombinedSvg
  },
  props: {
    frame: String,
    url: String,
    svg: String,
    color: String,
    logo: String,
    size: Number,
    top: Number,
    left: Number
  },
  data() {
    return {
      showSvg: true,
      // width: 256,
      // height: 256,
      // top: 0,
      // left: 0
    };
  },
  methods: {
    doSave(item, name) {
      this.$refs.downloadLink.href = item;
      this.$refs.downloadLink.download = name;
      this.$refs.downloadLink.click();
    },
    getSvgBlob() {
      const svg = new XMLSerializer().serializeToString(this.$refs.qrSvg.$el);
      const svgBlob = new Blob([svg], {
        type: "image/svg+xml;charset=utf-8"
      });
      const DOMURL = self.URL || self.webkitURL || self;
      return DOMURL.createObjectURL(svgBlob);
    },
    saveSvg() {
      this.doSave(this.getSvgBlob(), "qr-code.svg");
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
      this.$emit("newSize", String(this.width));
    },
    saveCanvas(type) {
      const canvas = this.$refs.canvasRef;
      const frame = this.$refs.frameRef;
      const frameW = this.$refs.frameContainer.offsetWidth;
      const frameH = this.$refs.frameContainer.offsetHeight;
      const svg = new Image();
      canvas.width = frameW;
      canvas.height = frameH;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(frame, 0, 0, frameW, frameH);
      svg.onload = () => {
        ctx.drawImage(svg, this.left, this.top, this.width, this.height);
        const png = canvas.toDataURL("image/" + type);
        this.doSave(png, "qr-code." + type);
      };
      svg.src = this.getSvgBlob();
    }
  },
  watch: {
    frame() {
      this.showSvg = false;
      setTimeout(() => {
        this.showSvg = true;
      }, 500);
    }
  }
});
</script>
