<template>
  <div id="app">
    <div class="container">
      <div class="row">

      </div>
      <div class="row" key="qr-step">
        <div class="col-md-8">
          <URLForm :color="color" :url="url" @url="url = $event" @svg="svg = $event" class="no-print" />
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
                :site="size"
                @newSize="size = $event"
              />
            </div>
          </div>
            <div v-else class="col-md-8">
            <p class="text-center ma-5"></p>
          </div>
        </div>
        <div class="col-md-4">
          <QRCodeSettings @color="color = $event" :color="color" @logo="logo = $event" @frame="frame = $event" />
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
              @click.prevent="$refs.displaySvg.saveCanvas('png')"
            >{{ l("App.saveWithFramePng") }}</button>
            <button
              v-if="url && frame"
              class="btn btn-default ma-5"
              type="button"
              @click.prevent="$refs.displaySvg.saveCanvas('jpg')"
            >{{ l("App.saveWithFrameJpg") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "~normalize.css/normalize.css";
@import "assets/css/app.scss";
</style>
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
    function getQueryParams(qs) {
      qs = qs.split('+').join(' ');
      var params = {},
          tokens,
          re = /[?&]?([^=]+)=([^&]*)/g;
      while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      }
      return params;
    }
    var query = getQueryParams(document.location.search);
    console.log(query);
    return {
      svg: "",
      url: query.url ? query.url : "",
      color: query.color ? query.color : "#000000",
      logo: query.logo ? query.logo : "",
      frame: query.frame ? query.frame : "",
      size: query.size ? query.size : "256"
    };
  }
};
</script>
