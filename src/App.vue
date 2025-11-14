<script setup>
import { reactive, provide, onMounted } from 'vue' //function sharing and reactive object/array

const cart = reactive([])
function addToCart(lesson) {
  if (lesson.space > 0) { //bigger than 0
    cart.push(lesson)
    lesson.space -= 1 //minus 1 when added cart
  }
}

function removeFromCart(index) {
  const lesson = cart[index]
  if (lesson) {
    lesson.space += 1 //restore space when removed
    cart.splice(index, 1)
  }
}

//injectable functions
provide('cart', cart)
provide('cartActions', { addToCart, removeFromCart })

</script>


<template>
  <RouterView></RouterView>
</template>

<style scoped></style>