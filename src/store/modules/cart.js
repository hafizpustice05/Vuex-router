import shop from "@/api/shop";

export default {
  state: {
    // {id, quantity}
    items: [],
    checkoutStatus: null,
  },
  getters: {
    cartProducts(state, getters, rootState) {
      return state.items.map((cartItem) => {
        console.log("cartItem: ", cartItem);
        const product = rootState.product.items.find(
          (product) => product.id == cartItem.id
        );
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity,
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
    },
  },

  mutations: {
    //const cartItem = {id:123, quantity: 2}
    PUSH_PRODUCT_TO_CART(state, productId) {
      state.items.push({ id: productId, quantity: 1 });
    },

    INCREMNET_ITEM_QUANTITY(state, cartItem) {
      cartItem.quantity++;
    },

    SET_CHECKOUT_STATUS(state, status) {
      state.checkoutStatus = status;
    },

    EMPTY_CART(state) {
      state.items = [];
    },
  },

  actions: {
    // addProductToCart(context, product) {
    //   if (context.getters.productIsInStock(product)) {
    //     //find cart item
    //     const cartItem = context.state.cart.find(
    //       (item) => item.id == product.id
    //     );

    //     if (!cartItem) {
    //       context.commit("PUSH_PRODUCT_TO_CART", product.id);
    //     } else {
    //       context.commit("INCREMNET_ITEM_QUANTITY", cartItem);
    //     }

    //     context.commit("DECREMENT_PRODUCT_INVENTORY", product);
    //   }
    // },
    addProductToCart({ state, commit, getters }, product) {
      if (getters.productIsInStock(product)) {
        //find cart item
        const cartItem = state.items.find((item) => item.id == product.id);

        if (!cartItem) {
          commit("PUSH_PRODUCT_TO_CART", product.id);
        } else {
          commit("INCREMNET_ITEM_QUANTITY", cartItem);
        }

        commit("DECREMENT_PRODUCT_INVENTORY", product);
      }
    },

    checkOut({ state, commit }) {
      shop.buyProducts(
        state.items,
        () => {
          commit("EMPTY_CART");
          commit("SET_CHECKOUT_STATUS", "SUCCESS");
        },
        () => {
          commit("SET_CHECKOUT_STATUS", "FAILED");
        }
      );
      console.log("checkout: ", state);
    },
  },
};
