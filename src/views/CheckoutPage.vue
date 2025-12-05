<script setup>
import { inject, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const cart = inject('cart')
const cartActions = inject('cartActions')
const router = useRouter()

//checkout details
const name = ref('')
const phone = ref('')
const orderMessage = ref('')

function nameValidation() {
  return /^[A-Za-z\s]+$/.test(name.value)//regex letters+space
}

function phoneValidation() {
  return /^[0-9]+$/.test(phone.value)
}

const canCheckout = computed(() => {
  return nameValidation() && phoneValidation() && cart.length > 0
})

async function submitOrder() {
  if (!canCheckout.value) return

  try {
    //grop cart items by lessonID
    const grouped = {}

    for (const lesson of cart) {
      if (!grouped[lesson._id]) {
        grouped[lesson._id] = { lesson, quantity: 0 }
      }
      grouped[lesson._id].quantity++
    }

    const orderDetailsBody = {
      name: name.value,
      phone: phone.value,
      items: Object.values(grouped).map(g => ({
        lessonID: g.lesson._id,
        quantity: g.quantity
      }))
    }

    //fetch - order post
    const res = await fetch('https://cst3144-webappbackend.onrender.com/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetailsBody)
    })

    if (!res.ok) throw new Error('Order failed')

    //fetch - space put
    for (const g of Object.values(grouped)) {
      await fetch(`https://cst3144-webappbackend.onrender.com/api/lessons/${g.lesson._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newSpace: g.lesson.space })
      })
    }

    //success message
    orderMessage.value = 'Your order has been received and is now processed. Thank you for your purchase.'
    cart.splice(0)

    setTimeout(() => {
      router.push('/')
    }, 6000)

  } catch (err) {
    console.error(err)
    orderMessage.value = 'Unable to submit order. Try again to reorder your booking.'
  }
}

// Total price
const totalPrice = computed(() => {
  const grouped = {}
  for (const lesson of cart) {
    if (!grouped[lesson._id]) grouped[lesson._id] = { price: lesson.price, quantity: 0 }
    grouped[lesson._id].quantity++
  }
  return Object.values(grouped).reduce((sum, g) => sum + g.price * g.quantity, 0)
})


watch(
  () => cart.length,
  (val) => {
    if (val === 0 && !orderMessage.value) {
      setTimeout(() => router.push('/lessons'), 2500)
    }
  }
)



//group cart items - lesson
const groupedCart = computed(() => {
  const grouped = {}
  for (const lesson of cart) {
    if (!grouped[lesson._id]) {
      grouped[lesson._id] = { lesson, quantity: 0 }
    }
    grouped[lesson._id].quantity++
  }
  return Object.values(grouped)
})


//increase and decrease
function increaseQuantity(index) {
  const g = groupedCart.value[index]
  if (g.lesson.space > 0) {
    g.quantity++
    g.lesson.space--
    cart.push(g.lesson)
  }
}

function decreaseQuantity(index) {
  const g = groupedCart.value[index]
  if (g.quantity > 1) {
    g.quantity--
    g.lesson.space++
    const cartIndex = cart.findIndex(item => item._id === g.lesson._id)
    if (cartIndex !== -1) cart.splice(cartIndex, 1)
  } else {
    removeFromGroupedCart(index)
  }
}

function removeFromGroupedCart(index) {
  const g = groupedCart.value[index]
  const lessonID = g.lesson._id
  g.lesson.space += g.quantity
  for (let i = cart.length - 1; i >= 0; i--) {
    if (cart[i]._id === lessonID) cart.splice(i, 1)
  }
}
</script>

<template>
  <div class="shopping-cart-container">
  
    <div v-if="cart.length > 0">
<h1 class="cart-title">Checkout Cart</h1>
      <!-- Cart items -->
      <div class="cart-items">
        <transition-group name="fade" tag="div">
          <div v-for="(g, index) in groupedCart" :key="g.lesson._id" class="cart-item">
            <img :src="`https://cst3144-webappbackend.onrender.com/images/${g.lesson.image}`" />
            <div class="cart-item-info">
              <h3>{{ g.lesson.subject }}</h3>
              <p>{{ g.lesson.location }}</p>
              <p>Price: £{{ g.lesson.price }}</p>
              <p>Quantity:
                <button @click="decreaseQuantity(index)">-</button>
                {{ g.quantity }}
                <button @click="increaseQuantity(index)">+</button>
              </p>
            </div>
            <button class="remove-btn" @click="removeFromGroupedCart(index)">Remove</button>
          </div>
        </transition-group>
      </div>

      <!-- Total Price -->
      <div class="cart-total" v-if="cart.length > 0">
        <h3>Total: £{{ totalPrice.toFixed(2) }}</h3>
      </div>

      <!-- Checkout Form -->
      <div class="checkout-form">
        <form @submit.prevent="submitOrder">
          <label>Full name</label>
          <input v-model="name" placeholder="Enter your full name" />
          <p v-if="name && !nameValidation()" class="error">Your name can only contain letters and spaces.</p>

          <label>Phone number</label>
          <input v-model="phone" placeholder="Enter your phone" />
          <p v-if="phone && !phoneValidation()" class="error">Your phone number can only contain numbers.</p>

          <button type="submit" :disabled="!canCheckout">Complete Checkout</button>
        </form>
      </div>
    </div>

  </div>
  <div v-if="cart.length === 0 && !orderMessage" class="empty-cart message-box">
    <img src="../assets/shoppingcart.png" class="empty-img" />
    <p>Your cart is currently empty. Add items to your cart to proceed to check out</p>
  </div>

  <div v-if="orderMessage" class="order-message message-box">
    <img src="../assets/booksG.gif" class="order-img" />
    <p>{{ orderMessage }}</p>
  </div>
</template>


<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  color: #000;
  margin: 0;
  padding: 0;
}

/* Container */
.shopping-cart-container {
  max-width: 900px;
  margin: 50px auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.shopping-cart-container:empty {
  display: none;
  margin: 0;
  padding: 0;
  height: 0;
}

.cart-title {
  text-align: center;
  font-size: 2rem;
  color: #0c6478;
  margin-bottom: 30px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cart-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.cart-item img {
  width: 85px;
  height: 85px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 1.2rem;
}

cart-item-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  color: #09d1c7;
}

.cart-item-info p {
  margin: 2px 0;
  font-size: 0.95rem;
  color: #555;
}

.cart-item-info button {
  background-color: #09d1c7;
  border: none;
  color: #fff;
  padding: 3px 8px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.cart-item-info button:hover {
  background-color: #0c6478;
}

/* Remove button */
.remove-btn {
  margin-left: auto;
  background-color: #ff4d4f;
  border: none;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background-color: #d9363e;
}

/* Total price */
.cart-total {
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: right;
  color: #0c6478;
}

/* Checkout form */
.checkout-form {
  margin-top: 30px;
}

.checkout-form form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.checkout-form label {
  font-weight: bold;
  color: #333;
}

.checkout-form input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.checkout-form input:focus {
  outline: none;
  border-color: #09d1c7;
  box-shadow: 0 0 5px rgba(9, 209, 199, 0.4);
}

.checkout-form .error {
  color: #ff4d4f;
  font-size: 0.85rem;
  margin: -10px 0 0 0;
}

.checkout-form button {
  padding: 12px;
  border: none;
  background-color: #09d1c7;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.checkout-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.checkout-form button:hover:not(:disabled) {
  background-color: #0c6478;
}

.error {
  color: #d11a1a;
  font-size: 0.82rem;
  margin-top: -0.4rem;
}

.message-box {
  background: #ffffff;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 550px;
  text-align: center;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.5s ease forwards;
}

.empty-img,
.order-img {
  width: 160px;
  height: auto;
  margin-bottom: 1rem;
  object-fit: contain;
}

.message-box p {
  font-size: 1.1rem;
  color: #333;
  margin-top: 0.5rem;
  line-height: 1.4;
}

/* Fade animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
