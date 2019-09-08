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
          :svg="svg"
          :urlLength="urlLength"
          :logo="logo"
        />
      </VueDragResize>
      <VueDragResize
        v-for="(txt, index) in text"
        :key="'text-dragable-' + index"
        parentLimitation
        aspectRatio
        :x="txt.top"
        :y="txt.left"
        :w="txt.size"
        :h="txt.size"
        :isResizable="false"
        @dragging="changeTextPosition(index)"
      >
        <svg
          x="0px"
          y="0px"
          :width="txt.value.length * txt.size * 0.62"
          :height="txt.size * 1.5"
        >
          <text
            :font-size="txt.size + 'px'"
            :y="txt.size"
            x="0"
            :fill="txt.color"
          >
            {{ txt.value }}
          </text>
        </svg>
      </VueDragResize>
    </div>
    <canvas ref="canvasRef" v-show="false" />
    <a ref="downloadLink" v-show="false"></a>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters } from "vuex";
import CombinedSvg from "./CombinedSvg";

export default Vue.extend({
  name: "DisplayQRSvg",
  components: {
    CombinedSvg
  },
  data() {
    return {
      showSvg: true
    };
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
      const dimension = {
        top: newRect.top,
        left: newRect.left,
        size: newRect.width
      };
      this.$store.commit("SET_DIMENSION", dimension);
    },
    changeTextPosition(index) {
      return function(position) {
        this.$store.commit("SET_TEXT_POSITION", {
          index,
          top: position.top,
          left: position.left
        });
      };
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
  computed: {
    ...mapState({
      svg: state => state.svg,
      logo: state => state.logo,
      dimension: state => state.dimension,
      frame: state => state.frame,
      text: state => state.text
    }),
    ...mapGetters({ urlLength: "urlLength" })
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
