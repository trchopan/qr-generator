<template>
  <div id="app">
    <div class="container">
      <div class="row"></div>
      <div class="row" key="qr-step">
        <div class="col-md-8">
          <URLForm
            v-model="url"
            :color="settings.color"
            @svg="svg = $event"
            class="no-print"
          />
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
              <DisplayQRSvg
                ref="displaySvg"
                v-model="dimension"
                :url="url"
                :svg="svg"
                :settings="settings"
                :color="settings.color"
                :logo="settings.logo"
                :frame="settings.frame"
              />
            </div>
          </div>
          <div v-else class="col-md-8">
            <p class="text-center ma-5"></p>
          </div>
        </div>
        <div class="col-md-4">
          <QRCodeSettings
            v-model="settings"
            @reset="$refs.displaySvg.reset()"
          />
          <div class="text-center">
            <button
              v-if="url && !settings.frame"
              class="btn btn-default ma-5"
              type="button"
              @click.prevent="$refs.displaySvg.saveSvg()"
            >
              {{ l("App.saveQR") }}
            </button>
            <button
              v-if="url && settings.frame"
              class="btn btn-default ma-5"
              type="button"
              @click.prevent="$refs.displaySvg.saveCanvas('png')"
            >
              {{ l("App.saveWithFramePng") }}
            </button>
            <button
              v-if="url && settings.frame"
              class="btn btn-default ma-5"
              type="button"
              @click.prevent="$refs.displaySvg.saveCanvas('jpg')"
            >
              {{ l("App.saveWithFrameJpg") }}
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
      settings: {
        color: "#000000",
        logo: "",
        frame: ""
      },
      dimension: {
        size: 256,
        top: 0,
        left: 0
      }
    };
  },
  methods: {
    getQueryParams(qs) {
      qs = qs.split("+").join(" ");
      const re = /[?&]?([^=]+)=([^&]*)/g;
      const params = {};
      let tokens;
      while ((tokens = re.exec(qs))) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      }
      return params;
    }
  },
  created() {
    const query = this.getQueryParams(document.location.search);
    this.url = query.url || window.QRCodeSettings['url'] || this.url;
    ["color", "logo", "frame"].forEach(attr => {
      this.settings[attr] = query[attr] || window.QRCodeSettings[attr] || this.settings[attr];
    });
    try {
      ["size", "top", "left"].forEach(attr => {
        this.dimension[attr] = query[attr]
          ? parseInt(query[attr])
          : window.QRCodeSettings[attr] || this.dimension[attr];
      });
    } catch (error) {
      console.error("Error changing dimention", error);
    }
  }
};
</script>
