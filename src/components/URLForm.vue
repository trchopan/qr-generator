<template>
  <form @submit.prevent="onSubmit()" class="form-inline">
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        id="link"
        v-model="url"
        placeholder="Enter your website"
      />
    </div>
    <button class="btn btn-default">
      <i class="fa fa-code"></i>
    </button>
  </form>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "URLForm",
  data() {
    return {
      url: ""
    };
  },
  methods: {
    onSubmit() {
      this.$emit("url", this.url);
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
