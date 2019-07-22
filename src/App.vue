<template>
  <div id="app">
    <div class="container">
      <URLForm @url="url = $event" class="no-print" />
      <transition name="slide" mode="out-in">
        <div v-if="step == 0" class="row" key="qr-step">
          <div class="col-md-6">
            <QRCodeSettings
              @color="color = $event"
              @logo="logoBase64 = $event"
            />
            <div v-if="url" class="text-center">
              <button
                class="btn btn-default mx-1"
                type="button"
                @click.prevent="$refs.displaySvg.saveSvg()"
              >
                Save as SVG
              </button>
              <button
                class="btn btn-default mx-1"
                type="button"
                @click.prevent="$refs.displaySvg.savePng()"
              >
                Save as PNG
              </button>
            </div>
          </div>
          <div v-if="url" class="col-md-6">
            <div class="ma-5">
              <DisplayQRSvg
                :url="url"
                :color="color"
                :logoBase64="logoBase64"
                ref="displaySvg"
              />
            </div>
            <div class="text-center">
              <button class="btn btn-default" @click="nextStep()">
                Put into Frame
              </button>
            </div>
          </div>
          <div v-else class="col-md-6">
            <p class="text-center ma-5">Enter URL</p>
          </div>
        </div>
        <div v-else class="row" key="frame-step">
          <div class="col-md-4 no-print">
            <button class="btn btn-default ma-5" @click="step = 0">
              Back
            </button>
            <FrameSettings
              @frame="frame = $event"
              @qrSize="qrSize = $event"
              @qrTop="qrTop = $event"
              @qrLeft="qrLeft = $event"
            />
          </div>
          <div v-if="frame" class="col-md-8">
            <DisplayWithFrame
              :frame="frame"
              :qrSize="qrSize"
              :qrTop="qrTop"
              :qrLeft="qrLeft"
            >
              <QRSvg :url="url" :color="color" :logoBase64="logoBase64" />
            </DisplayWithFrame>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import URLForm from "./components/URLForm.vue";
import QRCodeSettings from "./components/QRCodeSettings.vue";
import DisplayQRSvg from "./components/DisplayQRSvg.vue";
import FrameSettings from "./components/FrameSettings.vue";
import DisplayWithFrame from "./components/DisplayWithFrame.vue";
import QRSvg from "./components/QRSvg.vue";

export default {
  name: "app",
  components: {
    URLForm,
    QRCodeSettings,
    DisplayQRSvg,
    FrameSettings,
    DisplayWithFrame,
    QRSvg
  },
  data() {
    return {
      url: "",
      color: "",
      logoBase64: "",
      frame: "",
      step: 0,
      svg: "",
      qrSize: 10,
      qrTop: 0,
      qrLeft: 0
    };
  },
  methods: {
    nextStep() {
      this.step = 1;
      this.svg = this.$refs.displaySvg.svg;
    }
  }
};
</script>

<style lang="scss">
@import "~normalize.css/normalize.css";
@import "assets/css/app.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@media print {
  .no-print,
  .no-print * {
    display: none !important;
  }
}
.ma-5 {
  margin: 1.7rem;
}
.mx-1 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s, opacity 0.2s;
}
.slide-enter-to,
.slide-leave {
  transform: translate(0, 0);
  opacity: 1;
}
.slide-enter {
  transform: translate(100%, 0);
  opacity: 0;
}
.slide-leave-to {
  transform: translate(-100%, 0);
  opacity: 0;
}
</style>
