<template>
  <div>
    <div ref="frameContainer" class="frame--container">
      <img ref="frameRef" :src="frame" alt />
      <VueDragResize
        v-if="showSvg"
        parentLimitation
        aspectRatio
        :x="dimension.left"
        :y="dimension.top"
        :w="dimension.size"
        :h="dimension.size"
        @resizing="resize"
        @dragging="resize"
      >
        <CombinedSvg
          ref="qrSvg"
          :urlLength="url.length"
          :svg="svg"
          :color="color"
          :logo="logo"
        />
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
    value: Object
  },
  data() {
    return {
      showSvg: false,
      dimension: {
        size: 256,
        top: 0,
        left: 0
      }
    };
  },
  created() {
    this.dimension = this.value;
  },
  mounted() {
    this.$refs.frameRef.onload = () => {
      this.showSvg = true;
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
      this.dimension = {
        top: newRect.top,
        left: newRect.left,
        size: newRect.width
      };
      this.$emit("input", this.dimension);
    },
    saveCanvas(type) {
      const canvas = this.$refs.canvasRef;
      const frame = this.$refs.frameRef;
      const frameW = this.$refs.frameContainer.offsetWidth;
      const frameH = this.$refs.frameContainer.offsetHeight;
      const svg = new Image();
      svg.crossOrigin = "anonymous";
      frame.crossOrigin = "anonymous";
      canvas.width = frameW;
      canvas.height = frameH;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(frame, 0, 0, frameW, frameH);
      svg.onload = () => {
        const { size, left, top } = this.dimension;
        ctx.drawImage(svg, left, top, size, size);
        const png = canvas.toDataURL("image/" + type);
        this.doSave(png, "qr-code." + type);
      };
      svg.src = this.getSvgBlob();
    }
  },
  watch: {
    frame(val) {
      this.showSvg = false;
      if (!val) {
        setTimeout(() => {
          this.showSvg = true;
        }, 500);
      }
    }
  }
});
</script>
