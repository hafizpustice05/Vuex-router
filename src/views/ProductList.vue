<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" />
    <ul v-else>
      <li v-for="product in products">
        {{ product.title }} - {{ product.price }} -
        {{ product.inventory }}
        <button
          :disabled="!productIsInStock(product)"
          @click="addProductToCart(product)"
        >
          Add to cart
        </button>
      </li>
    </ul>

    <hr />
    <shopping-cart></shopping-cart>
  </div>
</template>

<script>
// import store from "@/store/index"; :disabled="!productIsInStock(product)"

import ShoppingCart from "./../components/ShoppingCart.vue";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {
    ShoppingCart,
  },
  data() {
    return {
      loading: false,
      //   products: [],
    };
  },

  methods: {
    ...mapActions({
      fetchProducts: "fetchProduct",
      addProductToCart: "addProductToCart",
    }),

    // addProductToCart(product) {
    //   this.$store.dispatch("addProductToCart", product);
    // },
  },

  computed: {
    ...mapState({
      products: (state) => state.product.items, // this is alternate of products method
    }),
    // products() {
    //   // return this.$store.state.products;
    //   return this.$store.getters.availableProducts;
    // },

    ...mapGetters({
      productIsInStock: "productIsInStock",
    }),

    // productIsInStock() {
    //   return this.$store.getters.productIsInStock;
    // },
  },

  created() {
    this.loading = true;
    // this.$store.dispatch("fetchProduct").then(() => (this.loading = false));
    this.fetchProducts().then(() => (this.loading = false));
    this.loading = false;
  },
};
</script>

<style scoped></style>
