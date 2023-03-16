import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export const getAllProducts = async () => {
  let loading = true;
  let error = null;
  let result = null;

  try {
    const req = await axios({
      method: "GET",
      url: `${API_URL}/api/products`,
    });

    if (!req.data.status) {
      throw Error(req.data.message);
    }

    result = req.data.data;
    loading = false;
  } catch (err) {
    error = err;
    loading = false;
  }

  return { loading, error, result };
};

export const getProduct = async (id) => {
  let loading = true;
  let error = null;
  let result = null;

  try {
    const req = await axios({
      method: "GET",
      url: `${API_URL}/api/products/${id}`,
    });

    if (!req.data.status) {
      throw Error(req.data.message);
    }

    result = req.data.data;
    loading = false;
  } catch (err) {
    error = err;
    loading = false;
  }

  return { loading, error, result };
};
