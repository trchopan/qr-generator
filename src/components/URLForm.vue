<template>
  <div class="form-group">
    <input
      type="text"
      class="form-control"
      id="link"
      v-model="url"
      :placeholder="l('URLForm.enterUrl')"
    />
  </div>
</template>

<script>
import Vue from "vue";
import QRCode from "qrcode";
import debounce from "lodash/debounce";

export default Vue.extend({
  name: "URLForm",
  props: {
    color: String,
    value: String
  },
  data() {
    return {
      url: ""
    };
  },
  created() {
    this.url = this.value;
    this.debouncedInput = debounce(this.changeUrl, 350);
    this.debouncedInput();
  },
  methods: {
    async getSvg() {
      if (!this.url) {
        return "";
      }
      return await QRCode.toString([{ data: this.url, mode: "byte" }], {
        type: "svg",
        errorCorrectionLevel: "L",
        margin: 1,
        color: {
          light: "#ffffff",
          dark: this.color || "#000000"
        }
      });
    },
    async changeUrl() {
      this.$emit("input", this.url);
      this.$emit("svg", await this.getSvg());
    }
  },
  watch: {
    async color() {
      if (this.value) {
        this.$emit("svg", await this.getSvg());
      }
    },
    url() {
      this.debouncedInput();
    }
  }
});
</script>
