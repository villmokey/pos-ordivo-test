import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export const getAllProducts = async (params) => {
  let loading = true;
  let error = null;
  let result = null;

  try {
    const req = await axios({
      method: "GET",
      url: `${API_URL}/api/products?${params}`,
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

export const createProduct = async (payload) => {
  let loading = true;
  let error = null;
  let result = null;

  try {
    const req = await axios({
      method: "POST",
      url: `${API_URL}/api/products/`,
      data: payload,
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
