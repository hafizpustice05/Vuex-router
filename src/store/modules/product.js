import shop from "@/api/shop";

export default {
  state: {
    items: [],
  },
  getters: {
    availableProducts(state, getters) {
      return state.items.filter((product) => product.inventory > 0);
    },

    productIsInStock() {
      return (product) => {
        return product.inventory > 0;
      };
    },
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.items = products;
    },

    DECREMENT_PRODUCT_INVENTORY(state, product) {
      product.inventory--;
    },
  },
  actions: {
    // fetchProduct(context) {
    //   shop.getProducts((products) => {
    //     context.commit("SET_PRODUCTS", products);
    //   });
    // },

    fetchProduct({ commit }) {
      return new Promise((resolve, reject) => {
        shop.getProducts((products) => {
          commit("SET_PRODUCTS", products);
          resolve();
        });
      });
    },
  },
};
