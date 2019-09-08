<template>
  <div id="app">
    <div class="container">
      <div class="row" key="qr-step">
        <div class="col-md-8">
          <URLForm class="no-print" />
          <div v-if="url" class="p-relative">
            <div class="no-print">
              <button
                class="btn embeded-button"
                type="button"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i class="fa fa-code"></i>
              </button>
              <EmbededModal :url="url" :size="dimension.size" />
            </div>
            <div>
              <DisplayQRSvg ref="displaySvg" />
            </div>
          </div>
          <div v-else class="col-md-8">
            <p class="text-center ma-5"></p>
          </div>
        </div>
        <div class="col-md-4">
          <QRCodeSettings />
          <div class="text-center">
            <button
              v-if="url && !frame"
              class="btn btn-default ma-5"
              type="button"
              @click="$refs.displaySvg.saveSvg()"
            >
              {{ l("App.saveQR") }}
            </button>
            <template v-if="url && frame">
              <button
                class="btn btn-default ma-5"
                type="button"
                @click="$refs.displaySvg.saveCanvas('png')"
              >
                {{ l("App.saveWithFramePng") }}
              </button>
              <button
                class="btn btn-default ma-5"
                type="button"
                @click="$refs.displaySvg.saveCanvas('jpg')"
              >
                {{ l("App.saveWithFrameJpg") }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import URLForm from "./components/URLForm.vue";
import QRCodeSettings from "./components/QRCodeSettings.vue";
import DisplayQRSvg from "./components/DisplayQRSvg.vue";
import EmbededModal from "./components/EmbededModal.vue";
import { setTimeout } from "timers";

export default {
  name: "app",
  components: {
    URLForm,
    QRCodeSettings,
    DisplayQRSvg,
    EmbededModal
  },
  methods: {
    setWidth() {
      let pRelative = document.getElementsByClassName("p-relative")[0];
      if (pRelative)
        pRelative.style.width = pRelative.parentElement.offsetWidth - 30 + "px";
    }
  },
  created() {
    this.$store.dispatch("initialize");
  },
  mounted() {
    this.setWidth();
    let elem = this;
    window.addEventListener("resize", function() {
      elem.setWidth();
    });
  },
  computed: {
    ...mapState({
      url: state => state.url,
      dimension: state => state.dimension,
      frame: state => state.frame
    })
  },
  watch: {
    url() {
      let elem = this;
      setTimeout(function() {
        elem.setWidth();
      }, 500);
    }
  }
};
</script>
