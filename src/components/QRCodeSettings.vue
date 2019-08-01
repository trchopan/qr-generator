<template>
  <div class="panel-group" id="accordion">
    <PanelSetting :title="l('color')" open>
      <div class="form-group">
        <chrome-picker
          @input="updateColor"
          :value="color"
          class="color-picker"
        />
      </div>
    </PanelSetting>
    <PanelSetting title="Logo">
      <div class="form-group input--fileupload">
        <label ref="logoLabel">Upload your own</label>
        <input
          type="file"
          id="logo"
          @change="changeLogo"
          accept="image/png, image/jpeg"
        />
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
      <div class="form-group input--fileupload">
        <label ref="frameLabel">Customize</label>
        <input
          type="file"
          id="image"
          @change="changeFrame"
          accept="image/png, image/jpeg"
        />
      </div>
    </PanelSetting>
  </div>
</template>

<script>
import Vue from "vue";
import PanelSetting from "./PanelSetting";
import { Chrome } from "vue-color";
import BackgroundImage from "@/assets/background.jpg";

export default Vue.extend({
  name: "QRCodeSettings",
  components: {
    PanelSetting,
    "chrome-picker": Chrome
  },
  data() {
    return {
      color: "#0066ff",
      showColorPicker: false
    };
  },
  /**
   * Mounted then load the frame
   * This is for quick development not in production
   */
  mounted() {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const event = {};
      event.target = {};
      event.target.files = [xhr.response];
      this.imageToBase64(event, result => {
        this.$emit("frame", result);
      });
    };
    xhr.open("GET", BackgroundImage);
    xhr.responseType = "blob";
    xhr.send();
  },
  methods: {
    imageToBase64(event, callback) {
      const files = event.target.files;
      if (!files || !files[0]) {
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
      this.$refs.logoLabel.innerText = event.target.files[0].name;
      this.imageToBase64(event, result => {
        this.$emit("logo", result);
      });
    },
    changeFrame(event) {
      this.$refs.frameLabel.innerText = event.target.files[0].name;
      this.imageToBase64(event, result => {
        this.$emit("frame", result);
      });
    },
    updateColor(event) {
      this.color = event.hex;
      this.$emit("color", this.color);
    }
  }
});
</script>

<style lang="scss" scoped>
.color-picker {
  margin: auto;
}
input[type="file"] {
  display: block !important;
  right: 1px;
  top: 1px;
  height: 34px;
  opacity: 0;
  width: 100%;
  background: none;
  position: absolute;
  overflow: hidden;
  z-index: 2;
}

.input--fileupload {
  display: block;
  border: 1px solid #d6d7d6;
  background: #fff;
  border-radius: 4px;
  width: 100%;
  height: 36px;
  line-height: 36px;
  padding: 6px 10px 2px 10px;
  overflow: hidden;
  position: relative;

  &:before,
  input,
  label {
    cursor: pointer !important;
  }
  /* File upload button */
  &:before {
    /* inherit from boostrap btn styles */
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
    text-align: center;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
    vertical-align: middle;
    cursor: pointer;
    background-color: #f5f5f5;
    background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
    background-repeat: repeat-x;
    border: 1px solid #cccccc;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    border-bottom-color: #b3b3b3;
    border-radius: 4px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 1px 2px rgba(0, 0, 0, 0.05);
    transition: color 0.2s ease;

    /* add more custom styles*/
    content: "Browse";
    display: block;
    position: absolute;
    z-index: 1;
    top: 2px;
    right: 2px;
    line-height: 20px;
    text-align: center;
  }
  &:hover,
  &:focus {
    &:before {
      color: #333333;
      background-color: #e6e6e6;
      color: #333333;
      text-decoration: none;
      background-position: 0 -15px;
      transition: background-position 0.2s ease-out;
    }
  }

  label {
    line-height: 24px;
    color: #999999;
    font-size: 14px;
    font-weight: normal;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    z-index: 1;
    margin-right: 90px;
    margin-bottom: 0px;
    cursor: text;
  }
}
</style>
