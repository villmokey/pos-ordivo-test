const API_URL = process.env.VUE_APP_API_URL;

const image = (src) => {
  return `${API_URL}/storage/${src}`;
};

export default image;
