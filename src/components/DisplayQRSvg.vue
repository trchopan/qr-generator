<template>
  <div>
    <div class="display--container">
      <div class="output--wrapper">
        <div ref="svgRef" class="output--svg">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 256 280"
            style="enable-background:new 0 0 256 280;"
            xml:space="preserve"
          >
            <image
              ref="imageRef"
              style="overflow:hidden;"
              :width="imgWidth"
              :height="imgHeight"
              :xlink:href="imgbase64"
              :transform="imgTranslate"
            ></image>
            <g v-html="svg" :transform="gTranslate"></g>
          </svg>
        </div>
      </div>
      <div class="setting--container">
        <div class="setting--item">
          <label for="qr-size">QR Size {{ qrSize }}</label>
          <input
            type="range"
            min="160"
            max="256"
            v-model="qrSize"
            id="qr-size"
          />
        </div>
        <div class="setting--item">
          <label for="qr-size">X {{ qrGroupX }}</label>
          <input type="range" min="0" max="256" v-model="qrGroupX" />
        </div>
        <div class="setting--item">
          <label for="qr-size">Y {{ qrGroupY }}</label>
          <input type="range" min="0" max="256" v-model="qrGroupY" />
        </div>
        <div class="setting--item">
          <label for="img-width">Image width {{ imgWidth }}</label>
          <input type="range" min="0" max="256" v-model="imgWidth" />
        </div>
        <div class="setting--item">
          <label for="img-width">Image height {{ imgHeight }}</label>
          <input type="range" min="0" max="256" v-model="imgHeight" />
        </div>
        <div class="setting--item">
          <label for="img-width">Image X {{ imgX }}</label>
          <input type="range" min="0" max="256" v-model="imgX" />
        </div>
        <div class="setting--item">
          <label for="img-width">Image Y {{ imgY }}</label>
          <input type="range" min="0" max="256" v-model="imgY" />
        </div>
      </div>
    </div>
    <button @click="save()" type="button">Save</button>
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
      qrSize: 174,
      qrGroupX: 45,
      qrGroupY: 27,
      imgWidth: 256,
      imgHeight: 256,
      imgX: 6,
      imgY: 17
    };
  },
  computed: {
    qrCode() {
      if (!this.input || !this.input.url) {
        return;
      }
      return new QRCode({
        content: this.input.url,
        width: this.qrSize,
        height: this.qrSize,
        padding: 1
      });
    },
    svg() {
      if (this.qrCode) {
        const svgString = this.qrCode.svg();
        return svgString;
      }
      return "";
    },
    imgbase64() {
      return this.input && this.input.image ? this.input.image : "";
    },
    gTranslate() {
      return `translate(${this.qrGroupX},${this.qrGroupY})`;
    },
    imgTranslate() {
      return `translate(${this.imgX},${this.imgY})`;
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
  display: flex;
  width: 500px;
  flex-wrap: wrap;
}
.output--wrapper {
  display: block;
  width: 256px;
  height: 280px;
  border: solid 1px black;
}
.output--svg {
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
