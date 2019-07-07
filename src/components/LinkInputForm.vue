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
import qrCode from "@/assets/qr-frame.jpg";

export default {
  name: "LinkInputForm",
  data() {
    return {
      url: "",
      image: ""
    };
  },
  created() {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      this.imageToBase64(xhr.response, result => {
        this.image = result;
      });
    };
    xhr.open("GET", qrCode);
    xhr.responseType = "blob";
    xhr.send();
  },
  methods: {
    imageToBase64(file, callback) {
      const fileReader = new FileReader();
      fileReader.onloadend = e => {
        const { error, result } = e.target;
        if (error) {
          console.error(error);
        } else {
          callback(result);
        }
      };
      fileReader.readAsDataURL(file);
    },
    updateImage(event) {
      const files = event.target.files;
      if (files && files[0]) {
        this.imageToBase64(files[0], result => {
          this.image = result;
        });
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
