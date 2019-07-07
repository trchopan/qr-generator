<template>
  <form @submit.prevent="onSubmit()" class="form--wrapper">
    <label for="link">URL</label>
    <input type="text" id="link" v-model="url" />
    <label for="image">Image</label>
    <input type="file" id="image" @change="updateImage($event)" />
    <div class="generate--button">
      <button type="submit">Generate</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "LinkInputForm",
  data() {
    return {
      url: "",
      image: ""
    };
  },
  methods: {
    updateImage(event) {
      const files = event.target.files;
      if (files && files[0]) {
        const fileReader = new FileReader();
        fileReader.onloadend = e => {
          const { error, result } = e.target;
          if (error) {
            console.error(error);
          } else {
            this.image = result;
          }
        };
        fileReader.readAsDataURL(files[0]);
      }
    },
    onSubmit() {
      this.$emit("output", {
        url: this.url,
        image: this.image
      });
    }
  }
};
</script>

<style scoped lang="scss">
.form--wrapper {
  display: flex;
  flex-direction: column;
}
.generate--button {
  margin-top: 1rem;
}
</style>
