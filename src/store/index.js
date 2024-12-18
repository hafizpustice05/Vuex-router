// store.js (or wherever your store is defined)
import Vue from "vue";
import Vuex from "vuex";
import cart from "./modules/cart";
import product from "./modules/product";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    cart,
    product,
  },
  state: {},

  getters: {},

  actions: {},

  mutations: {},
});

export default store;
