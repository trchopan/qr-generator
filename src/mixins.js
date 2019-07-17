export const myMixin = {
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
    }
  }
};
