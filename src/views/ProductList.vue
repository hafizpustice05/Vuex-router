<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" />
    <ul v-else>
      <li v-for="product in products">
        {{ product.title }} - {{ product.price }} -
        {{ product.inventory }}
        <button @click="addProductToCart(product)">
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

export default {
  components: {
    ShoppingCart
  },
  data() {
    return {
      loading: false
      //   products: [],
    };
  },

  methods: {
    addProductToCart(product) {
      this.$store.dispatch("addProductToCart", product);
    }
  },

  computed: {
    products() {
      return this.$store.state.products;
      //   return this.$store.getters.availableProducts;
    }
  },

  created() {
    this.loading = true;
    this.$store.dispatch("fetchProduct").then(() => (this.loading = false));
  }
};
</script>

<style scoped></style>
