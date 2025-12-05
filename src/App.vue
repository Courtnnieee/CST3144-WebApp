<script setup>
import { reactive, provide, onMounted } from 'vue' //watches for changes in object/array,function/data sharing, add DOM

const lessons = reactive([])//shared
const cart = reactive([])

//fetch+mount cards
onMounted(async () => {
  try {
    const res = await fetch('https://cst3144-webappbackend.onrender.com/api/lessons')
    const data = await res.json()
    lessons.push(...data)//array
  } catch (err) {
    console.error('Failed to fetch lessons:', err)
  }
})

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
provide('lessons', lessons)
provide('cart', cart)
provide('cartActions', { addToCart, removeFromCart })

</script>


<template>
  <RouterView></RouterView>
</template>

<style scoped></style>