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
            :class="{ selected: _color === settings.color }"
            :style="'background-color: ' + _color"
          ></div>
        </div>
        <p @click="showPicker = !showPicker" class="customize-text text-center">
          {{ l("QRCodeSettings.customize") }}
        </p>
        <chrome-picker
          v-if="showPicker"
          @input="updateColor($event.hex)"
          :value="settings.color"
          class="color-picker"
        />
      </div>
    </PanelSetting>
    <PanelSetting id="logo" :title="l('QRCodeSettings.logo')">
      <div class="form-group input--fileupload" v-if="!settings.logo">
        <label ref="logoLabel">{{ l("QRCodeSettings.upload") }}</label>
        <input
          type="file"
          id="logo"
          @input="changeLogo"
          accept="image/png, image/jpeg"
        />
      </div>
      <template v-else>
        <img :src="settings.logo" alt class="m-b-5 max-h-100" />
        <div class="clearfix"></div>
        <button
          v-if="settings.logo"
          type="button"
          @click="changeLogo()"
          class="btn btn-default"
        >
          {{ l("QRCodeSettings.reset") }}
        </button>
      </template>
      <p class="text-left text-bold">
        <strong>{{ l("QRCodeSettings.pleaseScan") }}</strong>
      </p>
      <p class="text-left">{{ l("QRCodeSettings.beware") }}</p>
      <p class="text-left">{{ l("QRCodeSettings.theColor") }}</p>
    </PanelSetting>
    <PanelSetting id="text" :title="l('QRCodeSettings.text')">
      <div
        v-for="(txt, index) in text"
        :key="'text-' + index"
        class="form-group"
      >
        <div class="input-group" style="width: 100%; display: flex">
          <input
            type="text"
            class="form-control"
            v-model="txt.value"
            style="width: calc(100% - 2.5rem)"
          />
          <div
            @click="txt.showPicker = !txt.showPicker"
            class="color-select"
            :style="'background-color: ' + txt.color"
          ></div>
        </div>
        <chrome-picker
          v-if="txt.showPicker"
          @input="changeTextColor(index, $event.hex)"
          :value="txt.color"
          class="color-picker"
        />
      </div>
      <button
        class="btn btn-default ma-5"
        type="button"
        @click.prevent="addText"
      >
        {{ l("QRCodeSettings.addText") }}
      </button>
    </PanelSetting>
    <PanelSetting id="frame" :title="l('QRCodeSettings.frame')">
      <div class="form-group input--fileupload" v-if="!settings.frame">
        <label ref="frameLabel">{{ l("QRCodeSettings.upload") }}</label>
        <input
          type="file"
          id="image"
          @input="changeFrame"
          accept="image/png, image/jpeg"
        />
      </div>
      <template v-else>
        <img :src="settings.frame" alt class="m-b-5 max-h-100" />
        <div class="clearfix"></div>
        <button type="button" @click="changeFrame()" class="btn btn-default">
          {{ l("QRCodeSettings.reset") }}
        </button>
      </template>
    </PanelSetting>
  </div>
</template>

<script>
import Vue from "vue";
import PanelSetting from "./PanelSetting";
import { Chrome } from "vue-color";

export default Vue.extend({
  name: "QRCodeSettings",
  props: {
    value: Object
  },
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
      showPicker: false,
      settings: {
        color: "#000000",
        logo: "",
        frame: ""
      },
      text: []
    };
  },
  created() {
    this.settings = this.value;
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
      if (event === undefined) {
        this.settings[emitter] = "";
        this.$emit("input", this.settings);
        setTimeout(() => {
          this.$emit("reset", true);
          if (labelRef) labelRef.innerText = this.l("QRCodeSettings.upload");
        }, 100);
        return;
      }
      if (event && event.target.files && event.target.files[0]) {
        let name = event.target.files[0].name;
        if (name.length > 20) {
          const start = name.substring(0, 16);
          const last = name.slice(name.length - 4, name.length);
          name = start + "..." + last;
        }
        if (labelRef) labelRef.innerText = name;
        this.imageToBase64(event, result => {
          this.settings[emitter] = result;
          this.$emit("input", this.settings);
        });
      }
    },
    changeLogo(event) {
      if (event !== undefined && !event.target.value) {
        return;
      }
      this.changeInput(event, this.$refs.logoLabel, "logo");
    },
    changeFrame(event) {
      if (event !== undefined && !event.target.value) {
        return;
      }
      this.changeInput(event, this.$refs.frameLabel, "frame");
    },
    changeTextColor(index, color) {
      this.text[index].color = color;
      // this.text[index].showPicker = false;
    },
    addText() {
      this.text.push({ value: "", color: "#000000", showPicker: false });
    },
    updateColor(color) {
      this.settings.color = color;
      this.$emit("input", this.settings);
    }
  },
  watch: {
    text() {
      this.$emit("text", this.text);
    }
  }
});
</script>
