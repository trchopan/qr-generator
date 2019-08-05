<template>
  <form @submit.prevent="onSubmit(url)" class="form-inline">
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        id="link"
        v-model="url"
        :placeholder="l('URLForm.enterUrl')"
      />
    </div>
    <button class="btn btn-default">
      <i class="fa fa-code"></i>
    </button>
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
  // mounted() {
  //   setTimeout(() => {
  //     this.onSubmit("wogasdfasdf");
  //   }, 500);
  // },
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

<style lang="scss" scoped>
.form-inline {
  .form-group {
    display: inline-block;
    width: calc(100% - 4rem);
    padding-right: 0.5rem;
    input {
      width: 100%;
    }
  }
}
</style>
