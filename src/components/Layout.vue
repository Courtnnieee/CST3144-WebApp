<script setup>
</script>

<template>

    <header id="header">
        <nav>
            <div class="logo">
                <img src="../assets/Logo.png" alt="Logo" />
            </div>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Book Lessons</a></li>
                <li><a href="#">Checkout</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <slot /> <!--content wrap -->
    </main>

    <footer>
        <h1>Your After-School Learning Hub</h1>
        <h2>Contact us at</h2>
        <a href="https://github.com/Courtnnieee" target="_blank">
            <img alt="pfp" src="https://avatars.githubusercontent.com/u/159250861?v=4"></img>
            <p>Courtnnieee</p>
        </a>
        <p>Find us in social media</p>
        <div class="social-links">
            <a href="https://www.linkedin.com/in/courtney-b-626b0a2b9/" target="_blank" rel="noopener noreferrer">
                <img src="../assets/LinkedIn.png" alt="LinkedIn">
            </a>

            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <img src="../assets/Facebook.webp" alt="Facebook" width="32" height="32">
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
    font-family: 'Poppins', sans-serif;
}

/* Nav */
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: none;
    padding: 1rem 2rem;
}

.logo img {
    height: 50px;
    width: auto;
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
    color: white;
    padding: 8px 12px;
    position: relative;
    transition: all 0.3s ease;
}

/* Lift hover nav*/
nav ul li a:hover {
    transform: translateY(-3px);
}

/* Underline effect */
nav ul li a::before {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 5px;
    background-color: #09D1C7;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.3s ease;
}

nav ul li a:hover::before {
    transform: scaleY(1);
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
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: white;
}

footer h1 {
    margin: 0;
    font-size: 30px;
    color: #09D1C7;
}

footer h2 {
    margin: 0;
    font-weight: lighter;
    font-size: 1.5rem;
}

footer a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    gap: 0.5rem;
}

footer img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid white;
    object-fit: cover;
}

footer .social-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

footer .social-links img {
    width: 32px;
    height: 32px;
    border: 2px solid white;
    border-radius: 5px;
    object-fit: cover;
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