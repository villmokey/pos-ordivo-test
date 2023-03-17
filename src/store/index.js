import { createStore } from "vuex";

const carts = localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [];

export default createStore({
  state: {
    cart: carts,
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
  },
  mutations: {
    addCarts(state, payload) {
      console.log(payload.carts);
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
  },
  actions: {},
  modules: {},
});
