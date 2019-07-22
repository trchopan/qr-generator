<template>
  <div>
    <div class="panel-group" id="accordion">
      <div class="panel panel-default">
        <div
          class="panel-heading"
          data-toggle="collapse"
          data-parent="#accordion"
          href="#color"
        >
          <h4 class="panel-title">
            Color
          </h4>
        </div>
        <div id="color" class="panel-collapse collapse in">
          <div class="panel-body">
            <div class="form-group">
              <label for="color">Color</label>
              <input
                type="color"
                id="color"
                v-model="color"
                class="form-control"
                @change="$emit('color', color)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="panel panel-default">
        <div
          class="panel-heading"
          data-toggle="collapse"
          data-parent="#accordion"
          href="#logoPanel"
        >
          <h4 class="panel-title">
            Logo
          </h4>
        </div>
        <div id="logoPanel" class="panel-collapse collapse">
          <div class="panel-body">
            <div class="form-group">
              <label for="color">Upload your own</label>
              <input type="file" id="logo" @change="changeLogo($event)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="text-left text-bold">
      <strong>
        Please scan the QR to check first
      </strong>
    </p>
    <p class="text-left">
      Beware the contrast of QR color and the logo
    </p>
    <p class="text-left">
      The color of the logo should be different from the QR code. Otherwise it
      will be difficult to be scanned.
    </p>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "QRCodeSettings",
  data() {
    return {
      color: "#0066ff"
    };
  },
  methods: {
    changeLogo(event) {
      const files = event.target.files;
      if (files && files[0]) {
        this.imageToBase64(files[0], result => {
          this.$emit("logo", result);
        });
      }
    },
    changeColor() {
      this.$emit("color", this.color);
    }
  }
});
</script>

<style lang="scss" scoped></style>
