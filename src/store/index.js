// store.js (or wherever your store is defined)
import Vue from "vue";
import Vuex from "vuex";
import shop from "../api/shop";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products: [],
    // {id, quantity}
    cart: [],
    checkoutStatus: null
  },

  getters: {
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    },

    cartProducts(state) {
      return state.cart.map(cartItem => {
        console.log("cartItem: ", cartItem);
        const product = state.products.find(
          product => product.id == cartItem.id
        );
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        };
      });
    },
    cartTotal(state, getters) {
      //   let total = 0;
      //   getters.cartProducts.forEach((product) => {
      //     total += product.price * product.quantity;
      //   });

      //   return total;

      return getters.cartProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    }
  },

  actions: {
    // fetchProduct(context) {
    //   shop.getProducts((products) => {
    //     context.commit("SET_PRODUCTS", products);
    //   });
    // },

    fetchProduct({ commit }) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit("SET_PRODUCTS", products);
          resolve();
        });
      });
    },

    addProductToCart(context, product) {
      if (product.inventory > 0) {
        //find cart item
        const cartItem = context.state.cart.find(item => item.id == product.id);

        if (!cartItem) {
          context.commit("PUSH_PRODUCT_TO_CART", product.id);
        } else {
          context.commit("INCREMNET_ITEM_QUANTITY", cartItem);
        }

        context.commit("DECREMENT_PRODUCT_INVENTORY", product);
      }
    },
    checkOut({ state, commit }) {
      shop.buyProducts(
        state.cart,
        () => {
          commit("EMPTY_CART");
          commit("SET_CHECKOUT_STATUS", "SUCCESS");
        },
        () => {
          commit("SET_CHECKOUT_STATUS", "FAILED");
        }
      );
    }
  },

  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },

    //const cartItem = {id:123, quantity: 2}
    PUSH_PRODUCT_TO_CART(state, productId) {
      state.cart.push({ id: productId, quantity: 1 });
    },

    INCREMNET_ITEM_QUANTITY(state, cartItem) {
      cartItem.quantity++;
    },

    DECREMENT_PRODUCT_INVENTORY(state, product) {
      product.inventory--;
    },

    SET_CHECKOUT_STATUS(state, status) {
      state.checkoutStatus = status;
    },
    EMPTY_CART(state) {
      state.cart = [];
    }
  }
});

export default store;
