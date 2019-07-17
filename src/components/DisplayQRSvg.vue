<template>
  <div>
    <div class="display--container">
      <div class="output--wrapper">
        <img :src="imgBase64" alt="" />
        <div ref="svgRef" class="output--svg" :style="svgStyle">
          <svg
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
              :width="imgSize"
              :height="imgSize"
              :xlink:href="logoBase64"
              :transform="imgTranslate"
            ></image>
          </svg>
        </div>
      </div>
      <div>
        <div>
          <label for="qrSize">QR Size {{ qrSize }}</label>
          <input type="range" v-model="qrSize" min="0" max="1000" />
        </div>
        <div>
          <label for="qrSize">QR X {{ qrX }}</label>
          <input type="range" v-model="qrX" />
        </div>
        <div>
          <label for="qrSize">QR Y {{ qrY }}</label>
          <input type="range" v-model="qrY" />
        </div>
      </div>
    </div>
    <button @click="save()" type="button" class="btn">Save QR as svg</button>
    <a ref="downloadLink" v-show="false"></a>
  </div>
</template>

<script>
import Vue from "vue";
import QRCode from "qrcode-svg";

export default Vue.extend({
  name: "DisplayQRSvg",
  props: {
    input: Object
  },
  data() {
    return {
      qrSize: 200, // pixels
      qrX: 0,
      qrY: 0
    };
  },
  computed: {
    qrCode() {
      if (!this.input || !this.input.url) {
        console.error("no input given");
        return;
      }
      return new QRCode({
        content: this.input.url,
        padding: 1,
        color: this.input.color
      });
    },
    svg() {
      if (this.qrCode) {
        const svgString = this.qrCode.svg();
        return svgString;
      }
      return "";
    },
    logoBase64() {
      return this.input && this.input.logo ? this.input.logo : "";
    },
    imgBase64() {
      return this.input && this.input.image ? this.input.image : "";
    },
    imgSize() {
      const qrViewBox = 256;
      if (this.input && this.input.url) {
        const urlLength = this.input.url.length;
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
    imgTranslate() {
      return `translate(-${this.imgSize / 2},-${this.imgSize / 2})`;
    },
    svgStyle() {
      return {
        top: this.qrX + "%",
        left: this.qrY + "%",
        width: this.qrSize + "px"
      };
    }
  },
  methods: {
    save() {
      if (this.qrCode) {
        const svgBlob = new Blob([this.$refs.svgRef.innerHTML], {
          type: "image/svg+xml;charset=utf-8"
        });
        const svgUrl = URL.createObjectURL(svgBlob);
        this.$refs.downloadLink.href = svgUrl;
        this.$refs.downloadLink.download = "qr-code.svg";
        this.$refs.downloadLink.click();
      }
    }
  }
});
</script>

<style lang="scss">
.display--container {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  position: relative;
}
.output--wrapper {
  display: block;
  position: relative;
}
.output--svg {
  position: absolute;
  svg {
    display: block;
  }
}
.setting--container {
  margin-left: 1rem;
}
.setting--item {
  display: flex;
  flex-direction: column;
}
</style>
