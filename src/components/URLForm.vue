<template>
  <form @submit.prevent="onSubmit(url)">
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        id="link"
        v-model="url"
        :placeholder="l('URLForm.enterUrl')"
      />
    </div>
  </form>
</template>

<script>
import Vue from "vue";
import QRCode from "qrcode";

export default Vue.extend({
  name: "URLForm",
  props: {
    color: String
  },
  mounted() {
    if (process.env.NODE_ENV === "production") {
      return;
    }
    setTimeout(() => {
      this.onSubmit("wogasdfasdf");
    }, 500);
  },
  data() {
    return {
      url: ""
    };
  },
  methods: {
    async getSvg(svg) {
      return await QRCode.toString(svg, {
        type: "svg",
        margin: 1,
        color: {
          light: "#ffffff",
          dark: this.color || "#000000"
        }
      });
    },
    async onSubmit(url) {
      this.$emit("url", url);
      this.$emit("svg", await this.getSvg(url));
    }
  },
  watch: {
    async color() {
      if (this.url) {
        this.$emit("svg", await this.getSvg(this.url));
      }
    }
  }
});
</script>
