<script setup>
import { inject, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

//get the shared cart
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
    orderMessage.value = '✓ Order submitted successfully! Thank you for your purchase.'
    cart.splice(0)

    // 6. Redirect
    setTimeout(() => {
      router.push('/')
    }, 4000)

  } catch (err) {
    console.error(err)
    orderMessage.value = 'Unable to submit order. Try again to reorder your booking.'
  }
}

watch(
  () => cart.length,
  (val) => {
    if (val === 0 && !orderMessage.value) {
      setTimeout(() => router.push('/'), 2500)
    }
  }
)
</script>

<template>
  <div class="shopping-cart-container">

    <div v-if="cart.length > 0">
      <!-- Cart items -->
      <div class="cart-items">
        <transition-group name="fade" tag="div">
          <div v-for="(item, index) in cart" :key="item._id" class="cart-item">
            <img :src="`https://cst3144-webappbackend.onrender.com/images/${item.image}`" />
            <div class="cart-item-info">
              <h3>Subject: {{ item.subject }}</h3>
              <p>Location: {{ item.location }}</p>
              <p>Price: £{{ item.price }}</p>
            </div>
            <button class="remove-btn" @click="cartActions.removeFromCart(index)">
              Remove
            </button>
          </div>
        </transition-group>
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
  <div v-if="cart.length === 0 && !orderMessage" class="empty-cart">
    Your cart is empty. Redirecting you home...
  </div>

  <div v-if="orderMessage" class="order-message">
    {{ orderMessage }}
  </div>

</template>


<style scoped>
.shopping-cart-container {
  max-width: 850px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

/* Cart Items */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06);
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.cart-item img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 1rem;
}

.cart-item-info {
  flex: 1;
}

.cart-item-info h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.cart-item-info p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  color: #444;
}

.remove-btn {
  background: #d93434;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.25s ease, transform 0.1s ease;
}

.remove-btn:hover {
  background: #b52929;
  transform: scale(1.03);
}

/* Checkout Form */
.checkout-form {
  margin-top: 2rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06);
}

.checkout-form h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #08b9b0;
}

.checkout-form form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.checkout-form label {
  font-weight: 600;
}

.checkout-form input {
  padding: 0.7rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

/* Submit button */
button[type="submit"] {
  margin-top: 0.5rem;
  padding: 0.8rem;
  background: #09d1c7;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.25s ease, transform 0.1s ease;
}

button[type="submit"]:hover:not(:disabled) {
  background: #0c6478;
  transform: scale(1.03);
}

button[type="submit"]:disabled {
  background: #bfbfbf;
  cursor: not-allowed;
}

/* Error messages */
.error {
  color: #d11a1a;
  font-size: 0.85rem;
}

/* Order / Empty Cart Messages */
.order-message,
.empty-cart {
  margin-top: 1.5rem;
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  color: #09d1c7;
}

/* Fade-in animation for messages */
.order-message,
.empty-cart {
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Mobile */
@media (max-width: 600px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-item img {
    margin-bottom: 0.7rem;
  }

  .remove-btn {
    width: 100%;
    margin-left: 0;
    margin-top: 0.6rem;
    text-align: center;
  }

  .checkout-form {
    padding: 1rem;
  }
}
</style>