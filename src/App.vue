<template>
  <div id="app">
    <div class="container">
      <div class="row">

      </div>
      <div class="row" key="qr-step">
        <div class="col-md-8">
          <URLForm :color="color" @url="url = $event" @svg="svg = $event" class="no-print" />
          <div v-if="url" class="p-relative">
              <div>
              <button
                class="btn embeded-button"
                type="button"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i class="fa fa-code"></i>
              </button>
              <EmbededModal :url="url" :size="size" />
            </div>
            <div>
              <DisplayQRSvg
                ref="displaySvg"
                :url="url"
                :svg="svg"
                :color="color"
                :logo="logo"
                :frame="frame"
                @newSize="size = $event"
              />
            </div>
          </div>
            <div v-else class="col-md-8">
            <p class="text-center ma-5"></p>
          </div>
        </div>
        <div class="col-md-4">
          <QRCodeSettings @color="color = $event" @logo="logo = $event" @frame="frame = $event" />
          <div class="text-center">
            <button
              v-if="url && !frame"
              class="btn btn-default mx-1"
              type="button"
              @click.prevent="$refs.displaySvg.saveSvg()"
            >{{ l("App.saveQR") }}</button>
            <button
              v-if="url && frame"
              class="btn btn-default ma-5"
              type="button"
              @click.prevent="$refs.displaySvg.saveCanvas()"
            >{{ l("App.saveWithFrame") }}</button>
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
      frame: "",
      size: "256"
    };
  }
};
</script>
