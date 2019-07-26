<template>
  <div id="app">
    <div class="container">
      <URLForm @url="url = $event" class="no-print" />
      <div v-if="step == 0" class="row" key="qr-step">
        <div v-if="url" class="col-md-8">
          <div class="ma-5">
            <DisplayQRSvg
              ref="displaySvg"
              :url="url"
              :color="color"
              :logo="logo"
              :frame="frame"
              :qrSize="qrSize"
              :qrTop="qrTop"
              :qrLeft="qrLeft"
            />
          </div>
        </div>
        <div v-else class="col-md-8">
          <p class="text-center ma-5">Enter URL</p>
        </div>
        <div class="col-md-4">
          <QRCodeSettings
            @color="color = $event"
            @logo="logo = $event"
            @frame="frame = $event"
            @qrSize="qrSize = $event"
            @qrTop="qrTop = $event"
            @qrLeft="qrLeft = $event"
          />
          <div v-if="url" class="text-center">
            <button
              class="btn btn-default mx-1"
              type="button"
              @click.prevent="$refs.displaySvg.saveSvg()"
            >
              Save QR as SVG
            </button>
            <button
              class="btn btn-default mx-1"
              type="button"
              @click.prevent="$refs.displaySvg.savePng()"
            >
              Save QR as PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import URLForm from "./components/URLForm.vue";
import QRCodeSettings from "./components/QRCodeSettings.vue";
import DisplayQRSvg from "./components/DisplayQRSvg.vue";

export default {
  name: "app",
  components: {
    URLForm,
    QRCodeSettings,
    DisplayQRSvg
  },
  data() {
    return {
      url: "",
      color: "",
      logo: "",
      frame: "",
      step: 0,
      svg: "",
      qrSize: 50,
      qrTop: 0,
      qrLeft: 0
    };
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
</style>
