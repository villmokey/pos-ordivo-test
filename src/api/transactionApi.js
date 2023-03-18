import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export const createTransaction = async (payload) => {
  let loading = true;
  let error = null;
  let result = null;

  try {
    const req = await axios({
      method: "POST",
      url: `${API_URL}/api/transactions`,
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

export const getTransaction = async (id) => {
  let loading = true;
  let error = null;
  let result = null;

  try {
    const req = await axios({
      method: "GET",
      url: `${API_URL}/api/transactions/${id}`,
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

export const getAllTransactions = async () => {
  let loading = true;
  let error = null;
  let result = null;

  try {
    const req = await axios({
      method: "GET",
      url: `${API_URL}/api/transactions/`,
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
