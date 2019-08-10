<template>
  <div class="panel-group" id="accordion">
    <PanelSetting id="color" :title="l('QRCodeSettings.color')" open>
      <div class="form-group">
        <div class="text-center">
          <div
            v-for="_color in colorPresets"
            :key="'color-' + _color"
            @click="updateColor(_color)"
            class="color-select"
            :class="{ selected: _color === color }"
            :style="'background-color: ' + _color"
          ></div>
        </div>
        <p @click="showPicker = !showPicker" class="customize-text text-center">
          {{ l("QRCodeSettings.customize") }}
        </p>
        <chrome-picker
          v-if="showPicker"
          @input="updateColor($event.hex)"
          :value="color"
          class="color-picker"
        />
      </div>
    </PanelSetting>
    <PanelSetting id="logo" :title="l('QRCodeSettings.logo')">
      <div class="form-group input--fileupload">
        <label ref="logoLabel">{{ l("QRCodeSettings.upload") }}</label>
        <input
          type="file"
          id="logo"
          @change="changeLogo"
          accept="image/png, image/jpeg"
        />
      </div>
      <button type="button" @click="changeLogo()" class="btn btn-default">
        {{ l("QRCodeSettings.reset") }}
      </button>
      <p class="text-left text-bold">
        <strong>
          {{ l("QRCodeSettings.pleaseScan") }}
        </strong>
      </p>
      <p class="text-left">
        {{ l("QRCodeSettings.beware") }}
      </p>
      <p class="text-left">{{ l("QRCodeSettings.theColor") }}</p>
    </PanelSetting>
    <PanelSetting id="frame" :title="l('QRCodeSettings.frame')">
      <div class="form-group input--fileupload">
        <label ref="frameLabel">{{ l("QRCodeSettings.upload") }}</label>
        <input
          type="file"
          id="image"
          @change="changeFrame"
          accept="image/png, image/jpeg"
        />
      </div>
      <button type="button" @click="changeFrame()" class="btn btn-default">
        {{ l("QRCodeSettings.reset") }}
      </button>
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
      colorPresets: [
        "#000000",
        "#445f6f",
        "#704a4b",
        "#4caf4f",
        "#e7c028",
        "#c33332",
        "#1e78ab",
        "#c843ed",
        "#384af0"
      ],
      color: "#0066ff",
      showPicker: false
    };
  },
  /**
   * Mounted then load the frame
   * This is for quick development not in production
   */
  mounted() {
    if (process.env.NODE_ENV === "production") {
      return;
    }

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
    setTimeout(() => {
      xhr.send();
    }, 1000);
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
    changeInput(event, labelRef, emitter) {
      if (event && event.target.files && event.target.files[0]) {
        let name = event.target.files[0].name;
        if (name.length > 20) {
          const start = name.substring(0, 16);
          const last = name.slice(name.length - 4, name.length);
          name = start + "..." + last;
        }
        labelRef.innerText = name;
        this.imageToBase64(event, result => {
          this.$emit(emitter, result);
        });
      } else {
        labelRef.innerText = this.l("QRCodeSettings.upload");
        this.$emit(emitter, "");
      }
    },
    changeLogo(event) {
      this.changeInput(event, this.$refs.logoLabel, "logo");
    },
    changeFrame(event) {
      this.changeInput(event, this.$refs.frameLabel, "frame");
    },
    updateColor(color) {
      this.color = color;
      this.$emit("color", this.color);
    }
  }
});
</script>

<style lang="scss" scoped>
.color-select {
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0.5rem;
  transform: scale(1);
  transition: 0.2s transform;
  &:hover,
  &.selected {
    transform: scale(1.2);
  }
  &.selected {
    border: solid 2px white;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
}
.customize-text {
  margin-top: 2rem;
  text-decoration: underline;
  cursor: pointer;
}
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
