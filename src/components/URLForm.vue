<template>
  <div class="form-group">
    <input
      type="text"
      class="form-control"
      id="link"
      v-model="url"
      :placeholder="l('URLForm.enterUrl')"
    />
  </div>
</template>

<script>
import Vue from "vue";
import debounce from "lodash/debounce";

export default Vue.extend({
  name: "URLForm",
  created() {
    this.debouncedInput = debounce(this.changeUrl, 350);
  },
  methods: {
    async changeUrl(url) {
      this.$store.commit("SET_URL", url);
      this.$store.dispatch("updateSvg");
    }
  },
  computed: {
    url: {
      get() {
        return this.$store.state.url;
      },
      set(val) {
        this.debouncedInput(val);
      }
    }
  }
});
</script>
