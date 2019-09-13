import Vue from "vue";
import Vuex from "vuex";
import QRCode from "qrcode";

Vue.use(Vuex);

const mutationSetter = key => (state, value) => {
  state[key] = value;
};

const defaultDimension = () => ({
  size: 256,
  top: 0,
  left: 0
});

const defaultText = () => ({
  value: "",
  color: "#000000",
  showPicker: false,
  size: 16,
  top: 0,
  left: 0
});

function getQueryParams(qs) {
  qs = qs.split("+").join(" ");
  const re = /[?&]?([^=]+)=([^&]*)/g;
  const params = {};
  let tokens;
  while ((tokens = re.exec(qs))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}

export default new Vuex.Store({
  state: {
    url: "",
    svg: "",
    logo: "",
    color: "#000000",
    frame: "",
    dimension: defaultDimension(),
    text: []
  },
  getters: {
    urlLength: state => state.url.length
  },
  actions: {
    initialize({ commit, dispatch }) {
      const query =
        getQueryParams(document.location.search) || window.QRCodeSettings;
      ["url", "color", "logo", "frame"].forEach(attr => {
        if (query && query[attr]) {
          commit("SET_" + attr.toUpperCase(), query[attr]);
        }
      });
      if (query.url) {
        dispatch("updateSvg");
      }
      const hasDimension = ["size", "top", "left"].reduce(
        (acc, cur) => acc && query[cur],
        true
      );
      if (hasDimension) {
        try {
          const dimension = ["size", "top", "left"].reduce((acc, cur) => {
            return { ...acc, [cur]: parseInt(query[cur]) };
          }, {});
          commit("SET_DIMENSION", dimension);
        } catch (error) {
          console.error("Unable to parse dimension", error);
        }
      }
      if (query && query.print) {
        setTimeout(function() {
          window.print();
        }, 1000);
      }
    },
    async updateSvg({ commit, state }) {
      const svg = await QRCode.toString([{ data: state.url, mode: "byte" }], {
        type: "svg",
        errorCorrectionLevel: "L",
        margin: 1,
        color: {
          light: "#ffffff",
          dark: state.color || "#000000"
        }
      });
      commit("SET_SVG", svg);
    },
    resetDimension({ commit }) {
      commit("SET_DIMENSION", defaultDimension());
    },
    printState({ state }) {
      console.log("woot", JSON.stringify(state, null, 2));
    }
  },
  mutations: {
    SET_URL: mutationSetter("url"),
    SET_COLOR: mutationSetter("color"),
    SET_LOGO: mutationSetter("logo"),
    SET_DIMENSION: mutationSetter("dimension"),
    SET_FRAME: mutationSetter("frame"),
    SET_SVG: mutationSetter("svg"),
    ADD_TEXT(state) {
      state.text.push(defaultText());
    },
    REMOVE_TEXT(state, index) {
      state.text.splice(index, 1);
    },
    TOGGLE_TEXT_COLORPICKER(state, index) {
      state.text[index].showPicker = !state.text[index].showPicker;
    },
    SET_TEXT(state, payload) {
      const { index, text } = payload;
      state.text[index].value = text;
    },
    SET_TEXT_SIZE(state, payload) {
      const { index, size } = payload;
      try {
        state.text[index].size = parseInt(size);
      } catch (error) {
        console.error(error);
      }
    },
    SET_TEXT_COLOR(state, payload) {
      const { index, color } = payload;
      state.text[index].color = color;
    },
    SET_TEXT_POSITION(state, payload) {
      const { index, top, left } = payload;
      state.text[index].top = top;
      state.text[index].left = left;
    }
  }
});
