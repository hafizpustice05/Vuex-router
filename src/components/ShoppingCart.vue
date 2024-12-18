<template>
  <div>
    <h1>Cart List</h1>
    <ul class="li">
      <li v-for="product in products">
        {{ product.title }}-{{ product.price }}-{{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ cartTotal }}</p>
    <button @click="$store.dispatch('checkOut')">Checkout</button>
    <p v-if="$store.state.checkoutStatus">{{ $store.state.checkoutStatus }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.getters.cartProducts;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    },
  },
};
</script>

<style scoped></style>
