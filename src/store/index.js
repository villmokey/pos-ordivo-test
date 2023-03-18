import { createStore } from "vuex";

const carts = localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [];

export default createStore({
  state: {
    cart: carts,
    customerData: {
      customer_name: localStorage.getItem("customerName") && localStorage.getItem("customerName") !== "" ? JSON.parse(localStorage.getItem("customerName")) : "",
      customer_address: localStorage.getItem("customerAddress") && localStorage.getItem("customerAddress") !== "" ? JSON.parse(localStorage.getItem("customerAddress")) : "",
      customer_email: localStorage.getItem("customerEmail") && localStorage.getItem("customerEmail") !== "" ? JSON.parse(localStorage.getItem("customerEmail")) : "",
      customer_phone: localStorage.getItem("customerPhone") && localStorage.getItem("customerPhone") !== "" ? JSON.parse(localStorage.getItem("customerPhone")) : "",
    },
  },
  getters: {
    getCarts(state) {
      return state.cart;
    },
    getTotal(state) {
      let total = 0;
      state.cart.forEach((element) => {
        total += parseInt(element.total_price);
      });

      return total;
    },
    getCustomerData(state) {
      return state.customerData;
    },
  },
  mutations: {
    addCarts(state, payload) {
      if (state.cart.length) {
        const findObject = state.cart.findIndex((obj) => obj.id === payload.carts.id);

        if (findObject === -1) {
          state.cart.push({
            ...payload.carts,
            total_price: payload.carts.price * payload.carts.qty,
            qty: payload.carts.qty,
          });
        } else {
          state.cart[findObject].qty += 1;
          state.cart[findObject].total_price = parseInt(state.cart[findObject].price) * parseInt(state.cart[findObject].qty);
        }
      } else {
        state.cart.push({
          ...payload.carts,
          total_price: payload.carts.price * payload.carts.qty,
          qty: payload.carts.qty,
        });
      }

      localStorage.setItem("carts", JSON.stringify(state.cart));
    },
    deleteCarts(state, payload) {
      const filter = state.cart.filter((item) => item.id !== payload.id);

      if (filter.length) {
        state.cart = filter;
      } else {
        state.cart = [];
      }

      localStorage.setItem("carts", JSON.stringify(state.cart));
    },
    saveCustomerName(state, payload) {
      state.customerData.customer_name = payload;
      localStorage.setItem("customerName", JSON.stringify(payload));
    },
    saveCustomerPhone(state, payload) {
      state.customerData.customer_phone = payload;
      localStorage.setItem("customerPhone", JSON.stringify(payload));
    },
    saveCustomerAddress(state, payload) {
      state.customerData.customer_address = payload;
      localStorage.setItem("customerAddress", JSON.stringify(payload));
    },
    saveCustomerEmail(state, payload) {
      state.customerData.customer_email = payload;
      localStorage.setItem("customerEmail", JSON.stringify(payload));
    },
    cleanData(state) {
      localStorage.removeItem("carts");
      localStorage.removeItem("customerName");
      localStorage.removeItem("customerPhone");
      localStorage.removeItem("customerAddress");
      localStorage.removeItem("customerEmail");

      state.cart = [];
      state.customerData = {
        customer_name: "",
        customer_address: "",
        customer_email: "",
        customer_phone: "",
      };
    },
  },
  actions: {},
  modules: {},
});
