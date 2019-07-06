<template>
  <form @submit.prevent="onSubmit()">
    <label for="link">URL</label>
    <input type="text" id="link" v-model="url" />
    <button type="submit">Generate</button>
  </form>
</template>

<script>
export default {
  name: "LinkInputForm",
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
};
</script>

<style scoped lang="scss"></style>
