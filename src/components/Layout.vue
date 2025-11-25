<script setup>;
import { inject } from 'vue'

//get the shared cart
const cart = inject('cart')
</script>

<template>

    <header id="header">
        <nav>
            <div class="logo">
                <img src="../assets/Logo.png" alt="Logo" />
            </div>
            <ul>
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/lessons">Lessons</router-link>
                </li>
                <li>
                    <router-link to="/checkout" :class="{ disabled: cart.length === 0 }"
                        :tabindex="cart.length === 0 ? -1 : 0">Checkout
                        <span v-if="cart.length" class="cart-badge">{{ cart.length }}</span>
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>

    <main>
        <router-view /> <!--content wrap -->
    </main>

    <footer>
        <a href="https://github.com/Courtnnieee" target="_blank">
            <img alt="pfp" src="../assets/Github.png"></img>
            <p>Courtnnieee</p>
        </a>

        <p>Find us in social media</p>
        
        <div class="social-links">
            <a href="https://www.linkedin.com/in/courtney-b-626b0a2b9/" target="_blank" rel="noopener noreferrer">
                <img src="../assets/LinkedIn.png" alt="LinkedIn">
            </a>

            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <img src="../assets/Facebook.png" alt="Facebook" width="32" height="32">
            </a>

            <a href="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer">
                <img src="../assets/x.png" alt="X" width="32" height="32">
            </a>
        </div>
        &copy; 2025 EduClass.IQ
    </footer>
</template>

<style scoped>
header,
main,
footer {
    padding-top: 80px;
    font-family: 'Poppins', sans-serif;
}

/*nav */
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.35);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    position: fixed;
    top: 0;
    left: 0;
    width: 97%;
    z-index: 1000;
}

.logo img {
    height: 50px;
    width: auto;
    transition: transform 0.3s ease;
}

.logo img:hover {
    transform: scale(1.05);
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

nav ul li {
    margin-left: 2rem;
    font-size: 22px;
}

nav ul li a {
    text-decoration: none;
    color: rgb(0, 0, 0);
    padding: 8px 12px;
    position: relative;
    transition: all 0.3s ease;
}

nav ul li a:hover {
    transform: translateY(-3px);
}

nav ul li a::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #09D1C7, #00F5FF);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.35s ease;
}

nav ul li a:hover::before {
    transform: scaleX(1);
    transform-origin: left;
}

.cart-badge {
    background-color: #09D1C7;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 3px 8px;
    border-radius: 999px;
    margin-left: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 12px rgba(9, 209, 199, 0.6);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

nav ul li a:hover .cart-badge {
    transform: scale(1.2);
    box-shadow: 0 0 18px rgba(9, 209, 199, 0.75);
}

/* Disabled checkout */
.disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
}

/* Main content */
main {
    padding: 2rem;
    min-height: 70vh;
    background: transparent;
}

/* Footer */
footer {
    background: #030612;
    text-align: center;
    padding: 3rem 2rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    color: white;
    position: relative;
    overflow: hidden;
}

footer p {
    margin: 0.5rem 0;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
}

footer a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    gap: 0.75rem;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 8px;
}

footer a:hover {
    color: #09D1C7;
    background: rgba(9, 209, 199, 0.1);
    transform: translateY(-2px);
}

footer img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid rgba(9, 209, 199, 0.5);
    object-fit: cover;
    transition: all 0.3s ease;
}

footer a:hover img {
    border-color: #09D1C7;
    box-shadow: 0 0 15px rgba(9, 209, 199, 0.5);
    transform: scale(1.1);
}

footer .social-links {
    display: flex;
    gap: 1.25rem;
    justify-content: center;
    margin-top: 1rem;
}

footer .social-links a {
    padding: 0;
    border-radius: 8px;
    transition: all 0.3s ease;
}

footer .social-links img {
    width: 40px;
    height: 40px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    object-fit: cover;
    transition: all 0.3s ease;
}

footer .social-links a:hover {
    transform: translateY(-5px);
    background: transparent;
}

footer .social-links a:hover img {
    border-color: #09D1C7;
    box-shadow: 0 4px 20px rgba(9, 209, 199, 0.4);
    transform: scale(1.1);
}

/* Responsive */
@media (max-width: 600px) {
    nav {
        flex-direction: column;
        align-items: flex-start;
    }

    nav ul {
        flex-direction: column;
        width: 100%;
    }

    nav ul li {
        margin: 0.5rem 0;
    }
}
</style>