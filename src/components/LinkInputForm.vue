<template>
  <form @submit.prevent="onSubmit()" class="form--wrapper">
    <label for="link">URL length:{{ url.length }}</label>
    <input type="text" id="link" v-model="url" />
    <label for="color">Color</label>
    <input type="color" id="color" v-model="color" />
    <label for="logo">Logo</label>
    <input type="file" id="logo" @change="updateLogo($event)" />
    <label for="image">Image</label>
    <input type="file" id="image" @change="updateImage($event)" />
    <div class="generate--button">
      <button type="submit" class="btn">Generate</button>
    </div>
  </form>
</template>

<script>
// import qrLogo from "@/assets/qr-logo.png";

export default {
  name: "LinkInputForm",
  data() {
    return {
      url: "",
      logo: "",
      image: "",
      color: "#0066ff"
    };
  },
  created() {
    //    const xhr = new XMLHttpRequest();
    //    xhr.onload = () => {
    //      this.imageToBase64(xhr.response, result => {
    //        this.logo = result;
    //      });
    //    };
    //    xhr.open("GET", qrLogo);
    //    xhr.responseType = "blob";
    //    xhr.send();
    console.log('Hello');
  },
  methods: {
    updateLogo(event) {
      const files = event.target.files;
      if (files && files[0]) {
        this.imageToBase64(files[0], result => {
          this.logo = result;
        });
      }
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
        logo: this.logo,
        image: this.image,
        color: this.color
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
