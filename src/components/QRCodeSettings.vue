<template>
  <div class="panel-group" id="accordion">
    <PanelSetting id="color" :title="l('QRCodeSettings.color')" open>
      <div class="form-group">
        <div class="text-center">
          <div
            v-for="_color in colorPresets"
            :key="'color-' + _color"
            @click="changeColor(_color)"
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
          @input="changeColor($event.hex)"
          :value="color"
          class="color-picker"
        />
      </div>
    </PanelSetting>
    <PanelSetting id="logo" :title="l('QRCodeSettings.logo')">
      <div class="form-group input--fileupload" v-if="!logo">
        <label ref="logoLabel">{{ l("QRCodeSettings.upload") }}</label>
        <input
          type="file"
          id="logo"
          @input="changeLogo"
          accept="image/png, image/jpeg"
        />
      </div>
      <template v-else>
        <img :src="logo" alt class="m-b-5 max-h-100" />
        <div class="clearfix"></div>
        <button
          v-if="logo"
          type="button"
          @click="resetLogo"
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
            :value="txt.value"
            @input="changeText(index, $event.target.value)"
            style="width: calc(100% - 9rem)"
          />
          <input
            type="number"
            class="form-control"
            :value="txt.size"
            @input="changeTextSize(index, $event.target.value)"
            style="width: 6.5rem"
            min="8"
            max="120"
          />
          <div
            @click="toggleTextColorPicker(index)"
            class="color-select shadow"
            :style="'background-color: ' + txt.color"
          ></div>
        </div>
        <div v-if="txt.showPicker" class="color-picker__wrapper">
          <chrome-picker
            @input="changeTextColor(index, $event.hex)"
            :value="txt.color"
            class="color-picker"
          />
          <div
            class="color-picker__close"
            @click.prevent="toggleTextColorPicker(index)"
          >
            <i class="fa fa-times"></i>
          </div>
        </div>
        <button
          class="btn btn-default"
          type="button"
          @click.prevent="removeText(index)"
        >
          {{ l("QRCodeSettings.removeText") }}
        </button>
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
      <div class="form-group input--fileupload" v-if="!frame">
        <label ref="frameLabel">{{ l("QRCodeSettings.upload") }}</label>
        <input
          type="file"
          id="image"
          @input="changeFrame"
          accept="image/png, image/jpeg"
        />
      </div>
      <template v-else>
        <img :src="frame" alt class="m-b-5 max-h-100" />
        <div class="clearfix"></div>
        <button type="button" @click="resetFrame" class="btn btn-default">
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
import { mapState } from "vuex";

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
      showPicker: false
    };
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
      this.imageToBase64(event, result => {
        this.$store.commit("SET_LOGO", result);
      });
    },
    resetLogo() {
      this.$store.commit("SET_LOGO", "");
    },
    changeFrame(event) {
      this.imageToBase64(event, result => {
        this.$store.commit("SET_FRAME", result);
      });
    },
    resetFrame() {
      this.$store.commit("SET_FRAME", "");
      this.$store.dispatch("resetDimension");
    },
    addText() {
      this.$store.commit("ADD_TEXT");
    },
    removeText(index) {
      this.$store.commit("REMOVE_TEXT", index);
    },
    toggleTextColorPicker(index) {
      this.$store.commit("TOGGLE_TEXT_COLORPICKER", index);
    },
    changeTextColor(index, color) {
      this.$store.commit("SET_TEXT_COLOR", { index, color });
    },
    changeText(index, value) {
      this.$store.commit("SET_TEXT", { index, text: value });
    },
    changeTextSize(index, value) {
      this.$store.commit("SET_TEXT_SIZE", { index, size: value });
    },
    changeColor(color) {
      this.$store.commit("SET_COLOR", color);
      this.$store.dispatch("updateSvg");
    }
  },
  computed: {
    ...mapState({
      color: state => state.color,
      logo: state => state.logo,
      frame: state => state.frame,
      text: state => state.text
    })
  }
});
</script>
