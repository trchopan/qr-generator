<template>
  <form @submit.prevent="onSubmit()" class="form--wrapper">
    <!-- <label for="link">URL length:{{ url.length }}</label>
    <input type="text" id="link" v-model="url" /> -->

    <!-- <label for="logo">Logo</label>
    <input type="file" id="logo" @change="updateLogo($event)" /> -->


    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="form-group">
            <input type="text" class="form-control" id="link" v-model="url" placeholder="Enter your website" />
          </div>
          <div class="form-group">
            <button>
              <i class="fa fa-code"></i>
            </button>
            <DisplayQRSvg :input="output" />
          </div>
        </div>
        <div class="col-md-4">
          <div class="clearfix"></div>
          <!-- Start accordion -->
          <div class="panel-group" id="accordion">
            <div class="panel panel-default">
              <div class="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#frame">
                <h4 class="panel-title">
                  Frame
                </h4>
              </div>
              <div id="frame" class="panel-collapse collapse in">
                <div class="panel-body">
                  <div class="form-group">
                    <label for="image">Customize</label>
                    <input type="file" id="image" @change="updateImage($event)" />
                  </div>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#color">
                <h4 class="panel-title">
                  Color
                </h4>
              </div>
              <div id="color" class="panel-collapse collapse">
                <div class="panel-body">
                  <div class="form-group">
                    <label for="color">Color</label>
                    <input type="color" id="color" v-model="color" class="form-control" />
                  </div>
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#logoPanel">
                <h4 class="panel-title">
                  Logo
                </h4>
              </div>
              <div id="logoPanel" class="panel-collapse collapse">
                <div class="panel-body">
                  <div class="form-group">
                    <label for="color">Upload your own</label>
                    <input type="file" id="logo" @change="updateLogo($event)" />
                  </div>
                </div>
              </div>
            </div>
            <!-- End accordion -->
            <div class="generate--button">
              <button type="submit" class="btn">Generate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
// import qrLogo from "@/assets/qr-logo.png";
import DisplayQRSvg from "./DisplayQRSvg.vue";

export default {
  name: "LinkInputForm",
  components: {
    DisplayQRSvg
  },
  data() {
    return {
      url: "",
      logo: "",
      image: "",
      color: "#0066ff",
      output: {}
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
      this.output = {
        url: this.url,
        logo: this.logo,
        image: this.image,
        color: this.color
      };
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
