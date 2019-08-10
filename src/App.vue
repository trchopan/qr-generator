<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <URLForm
          :color="color"
          @url="url = $event"
          @svg="svg = $event"
          class="no-print col-xs-10"
        />
        <div class="col-xs-2">
          <button
            class="btn btn-default"
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <i class="fa fa-code"></i>
          </button>
          <EmbededModal :url="url" />
        </div>
      </div>
      <div class="row" key="qr-step">
        <div v-if="url" class="col-md-8">
          <div class="ma-5">
            <DisplayQRSvg
              ref="displaySvg"
              :url="url"
              :svg="svg"
              :color="color"
              :logo="logo"
              :frame="frame"
            />
          </div>
        </div>
        <div v-else class="col-md-8">
          <p class="text-center ma-5">{{ l("App.enterUrl") }}</p>
        </div>
        <div class="col-md-4">
          <QRCodeSettings
            @color="color = $event"
            @logo="logo = $event"
            @frame="frame = $event"
          />
          <div class="text-center">
            <button
              v-if="url && !frame"
              class="btn btn-default mx-1"
              type="button"
              @click.prevent="$refs.displaySvg.saveSvg()"
            >
              {{ l("App.saveQR") }}
            </button>
            <button
              v-if="url && frame"
              class="btn btn-default ma-5"
              type="button"
              @click.prevent="$refs.displaySvg.saveCanvas()"
            >
              {{ l("App.saveWithFrame") }}
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
import EmbededModal from "./components/EmbededModal.vue";

export default {
  name: "app",
  components: {
    URLForm,
    QRCodeSettings,
    DisplayQRSvg,
    EmbededModal
  },
  data() {
    return {
      svg: "",
      url: "",
      color: "",
      logo: "",
      frame: ""
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
