<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" style="display: inline">
            {{ l("EmbededModal.embedQr") }}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="input-group" style="width: 100%;">
            <input
              ref="text"
              type="text"
              class="form-control"
              :value="embededLink"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="copyClipboard">
            {{ l("EmbededModal.copy") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "EmbededModal",
  props: {
    url: String,
    size: String
  },
  computed: {
    embededLink() {
      const _size = parseInt(this.size, 10);
      const size = _size > 540 ? "540" : _size < 100 ? "100" : _size;
      return `<img src='https://chart.googleapis.com/chart?cht=qr&chl=${
        this.url
      }&chs=${size}x${size}&choe=UTF-8&chld=L|2' alt=''>`;
    }
  },
  methods: {
    copyClipboard() {
      const inputRef = this.$refs.text;
      inputRef.select();
      document.execCommand("copy");
      alert(this.l("EmbededModal.copied"));
    }
  }
});
</script>
