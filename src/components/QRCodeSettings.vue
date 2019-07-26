<template>
  <div class="panel-group" id="accordion">
    <PanelSetting title="Color" open>
      <div class="form-group">
        <label for="color">Color</label>
        <input
          type="color"
          id="color"
          class="form-control"
          @change="$emit('color', $event.target.value)"
        />
      </div>
    </PanelSetting>
    <PanelSetting title="Logo">
      <div class="form-group">
        <label for="color">Upload your own</label>
        <input type="file" id="logo" @change="changeLogo" />
      </div>
      <p class="text-left text-bold">
        <strong>
          Please scan the QR to check first
        </strong>
      </p>
      <p class="text-left">
        Beware the contrast of QR color and the logo
      </p>
      <p class="text-left">
        The color of the logo should be different from the QR code. Otherwise it
        will be difficult to be scanned.
      </p>
    </PanelSetting>
    <PanelSetting title="Frame">
      <div class="form-group">
        <label>Customize</label>
        <input type="file" id="image" @change="changeFrame" />
      </div>
    </PanelSetting>
  </div>
</template>

<script>
import Vue from "vue";
import PanelSetting from "./PanelSetting";

export default Vue.extend({
  name: "QRCodeSettings",
  components: {
    PanelSetting
  },
  data() {
    return {
      color: "#0066ff"
    };
  },
  methods: {
    imageToBase64(event, callback) {
      const files = event.target.files;
      if (!files || !files[0]) {
        console.error("No file found");
        return;
      }
      const fileReader = new FileReader();
      fileReader.onloadend = e => {
        const { error, result } = e.target;
        if (error) {
          console.error(error);
        } else {
          callback(result);
        }
      };
      fileReader.readAsDataURL(files[0]);
    },
    changeLogo(event) {
      this.imageToBase64(event, result => {
        this.$emit("logo", result);
      });
    },
    changeFrame(event) {
      this.imageToBase64(event, result => {
        this.$emit("frame", result);
      });
    }
  }
});
</script>
