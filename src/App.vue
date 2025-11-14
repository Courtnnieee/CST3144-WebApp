<script setup>
import { reactive, provide } from 'vue' //function sharing and reactive object/array

const cart = reactive([])
function addToCart(lesson) {
  cart.push(lesson)
}

function removeFromCart(index) {
  cart.splice(index, 1)
}
//injectable functions
provide('cart', cart)
provide('cartActions', { addToCart, removeFromCart })

</script>


<template>
<RouterView></RouterView>
</template>

<style scoped>

</style>