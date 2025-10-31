<script setup>

</script>

<template>
<div class="shopping-cart-container">
  <h2>My Cart</h2>

  <!-- Cart Items -->
  <div class="cart-items">
    <div class="cart-item">
      <img src="../assets/maths.png" alt="Math" class="cart-item-img" />
      <div class="cart-item-info">
        <h3>Subject: Math</h3>
        <p>Location: Hendon</p>
        <p>Price: £50</p>
      </div>
      <button class="remove-btn">Remove</button>
    </div>
  </div>

  <!-- Checkout Form -->
  <div class="checkout-form">
    <h3>Checkout</h3>
    <form>
      <label for="name">Name</label>
      <input type="text" id="name" placeholder="Enter your name" />

      <label for="phone">Phone Number</label>
      <input type="tel" id="phone" placeholder="Enter your phone number" />

      <button type="submit" class="book-btn">Book</button>
    </form>
  </div>
</div>

</template>

<style scoped>
.shopping-cart-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.shopping-cart-container h2 {
  text-align: center;
  color: #09d1c7;
  margin-bottom: 1.5rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.cart-item-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 6px;
  margin-right: 1rem;
}

.cart-item-info h3 {
  margin: 0 0 0.3rem 0;
  font-size: 1rem;
}

.cart-item-info p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
}

.remove-btn {
  margin-left: auto;
  background-color: #cc3131;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-btn:hover {
  background-color: #a82929;
}

/* Checkout Form */
.checkout-form {
  margin-top: 2rem;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.checkout-form h3 {
  margin-bottom: 1rem;
  color: #09d1c7;
}

.checkout-form form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.checkout-form label {
  font-weight: 600;
  font-size: 0.95rem;
}

.checkout-form input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
}

.book-btn {
  margin-top: 0.5rem;
  padding: 0.8rem;
  background-color: #09d1c7;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.book-btn:hover {
  background-color: #0c6478;
  transform: scale(1.02);
}
</style>