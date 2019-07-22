<template>
  <div class="panel-group" id="accordion">
    <div class="panel panel-default">
      <div
        class="panel-heading"
        data-toggle="collapse"
        data-parent="#accordion"
        href="#frame"
      >
        <h4 class="panel-title">
          Frame
        </h4>
      </div>
      <div id="frame" class="panel-collapse collapse in">
        <div class="panel-body">
          <div class="form-group">
            <label for="image">Customize</label>
            <input type="file" id="image" @change="changeFrame($event)" />
          </div>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div
        class="panel-heading"
        data-toggle="collapse"
        data-parent="#accordion"
        href="#color"
      >
        <h4 class="panel-title">
          Adjust QR code inside frame
        </h4>
      </div>
      <div id="color" class="panel-collapse collapse">
        <div class="panel-body">
          <div class="form-group">
            <label for="color">QR Size {{ qrSize }}</label>
            <input
              type="range"
              id="range"
              v-model="qrSize"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="color">QR X {{ qrLeft }}</label>
            <input
              type="range"
              id="range"
              v-model="qrLeft"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="color">QR Y {{ qrTop }}</label>
            <input
              type="range"
              id="range"
              v-model="qrTop"
              class="form-control"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "FrameSettings",
  data() {
    return {
      qrSize: 10,
      qrTop: 0,
      qrLeft: 0
    };
  },
  methods: {
    changeFrame(event) {
      const files = event.target.files;
      if (files && files[0]) {
        this.imageToBase64(files[0], result => {
          this.$emit("frame", result);
        });
      }
    }
  },
  watch: {
    qrSize(newVal) {
      this.$emit("qrSize", newVal);
    },
    qrTop(newVal) {
      this.$emit("qrTop", newVal);
    },
    qrLeft(newVal) {
      this.$emit("qrLeft", newVal);
    }
  }
});
</script>

<style lang="scss" scoped></style>
