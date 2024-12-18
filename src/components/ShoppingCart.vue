<template>
  <div>
    <h1>Cart List</h1>
    <ul class="li">
      <li v-for="product in products">
        {{ product.title }}-{{ product.price }}-{{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ cartTotal }}</p>
    <button @click="checkOut">Checkout</button>
    <!-- <button @click="$store.dispatch('checkOut')">Checkout</button> -->
    <p v-if="mapState_checkoutStatus">{{ mapState_checkoutStatus }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters({
      products: "cartProducts",
      cartTotal: "cartTotal",
    }),

    // products() {
    //   return this.$store.getters.cartProducts;
    // },
    // cartTotal() {
    //   return this.$store.getters.cartTotal;
    // },
    ...mapState({
      mapState_checkoutStatus: "checkoutStatus",
    }),
  },
  methods: {
    ...mapActions(["checkOut"]),
  },
};
</script>

<style scoped></style>
