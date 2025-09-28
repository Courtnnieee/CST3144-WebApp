<script setup>

</script>

<template>

  <div class="centered-template">
    <div class="logo-title">
      <img src="../../assets/Logo.png" alt="EduClass Logo">
      <h1>EduClass.IQ</h1>
    </div>
    <h2>Your After-School Learning Hub</h2>
    <h3>
      Discover and book lessons easily. Browse subjects, locations, and prices, add to cart, and
      <br></br>checkout in just a few clicks!
    </h3>
    <button class="button type1">
      <span class="btn-txt">Book a lesson</span> </button>
  </div>


  <div class="section-container">
    <div class="section-content">
      <div class="text-block">
        <h1>Parents empower your kids</h1>
        <h2>Enrolling your child in lessons helps them develop valuable skills, build confidence, and discover their
          passions.</h2>
        <p>
          Our platform offers a wide range of after-school classes and activities designed to spark curiosity, build
          skills, and foster creativity.
          With engaging lessons, expert instructors, and flexible scheduling, your child can explore new passions while
          developing academically and socially.
        </p>
      </div>
      <div class="image-block">
        <img src="../../assets/studystockimage.jpg" alt="Child learning">
      </div>
    </div>
  </div>


  <div class="reccomendation">
    <h2>Recommended Education Websites for Students</h2>
    <div class="reccomendation-cards">

      <a href="https://www.uplearn.co.uk/" target="_blank" class="rec-card">
        <img src="../../assets/UpLearn.jpg" alt="UpLearn" class="UpLearn-image">
        <p class="rec-name">Uplearn</p>
        <h4>Up Learn provides everything you need to get an A*/A at A Level in your subject, as efficiently as possible.
          No need for textbooks or tutors.</h4>
      </a>

      <a href="https://quizlet.com/" target="_blank" class="rec-card">
        <img src="../../assets/Quizlet.png" alt="IXL" class="Quizlet-image">
        <p class="rec-name">Quizlet</p>
        <h4> Master whatever you’re learning with Quizlet’s interactive flashcards, practice tests, and study
          activities.</h4>
      </a>

      <a href="https://www.ixl.com/" target="_blank" class="rec-card">
        <img src="../../assets/ixl.png" alt="IXL" class="IXL-image">
        <p class="rec-name">IXL Learning</p>
        <h4>IXL is personalised learning. With a comprehensive curriculum, individualised guidance and real-time
          analytics, IXL meets the unique needs of each learner.</h4>
      </a>

      <a href="https://www.khanacademy.org/" target="_blank" class="rec-card">
        <img src="../../assets/khanacademy.png" alt="IXL" class="KhanAcademy-image">
        <p class="rec-name">Khan Academy</p>
        <h4> Khan Academy aims to provide a free and accessible education to everyone, regardless of their background or
          location.</h4>
      </a>
    </div>
  </div>

</template>

<style scoped>
.centered-template {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  color: white;
  padding: 50px;
}

.logo-title {
  display: flex;
  align-items: center;
  gap: 10px;
  /* spacing between image and h1 */
}

.logo-title img {
  height: 100px;
  object-fit: contain;
}

.centered-template h1 {
  font-size: 80px;
  margin: 0;
  font-family: 'Quicksand', sans-serif;
  background: linear-gradient(135deg, white 20%, grey 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.centered-template h2 {
  font-size: 40px;
  font-weight: lighter;
  margin: 0;
}

.centered-template h3 {
  font-family: 'Telegraf', sans-serif;
  font-size: 20px;
  font-weight: lighter;
  margin: 0;
  line-height: 1.8rem;
}

/*Button by Gaurav-WebDev - https://uiverse.io/Gaurav-WebDev/tall-mayfly-60 */
.button {
  margin-bottom: 140px;
  margin-top: 25px;
  height: 50px;
  width: 200px;
  position: relative;
  background-color: transparent;
  cursor: pointer;
  border: 2px solid #09D1C7;
  overflow: hidden;
  border-radius: 30px;
  color: #09D1C7;
  transition: all 0.5s ease-in-out;
}

.btn-txt {
  z-index: 1;
  font-family: 'Telegraf', sans-serif;
  font-size: 18px;
}

.type1::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.5s ease-in-out;
  background-color: #09D1C7;
  border-radius: 30px;
  visibility: hidden;
  height: 10px;
  width: 10px;
  z-index: -1;
}

.button:hover {
  box-shadow: 1px 1px 200px #000;
  color: #000;
  border: none;
}

.type1:hover::after {
  visibility: visible;
  transform: scale(100) translateX(2px);
}

/*Reccomendation */
.reccomendation {
  padding: 40px 20px;
  text-align: center;
}

.reccomendation h2 {
  font-size: 40px;
  color: #ffffff;
  margin-top: 30px;
  margin-bottom: 30px;
  font-weight: lighter;
}

.reccomendation h4 {
  font-weight: 400;
  text-align: center;
  margin: 10px;
}

.reccomendation-cards {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: nowrap;
  margin: 0 auto;
  max-width: 1200px;
}

.rec-card {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: calc(25% - 15px);
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.rec-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.558);
}

.rec-card img {
  width: 100%;
  height: auto;
  border-radius: 15px 15px 0 0;
}

.rec-name {
  font-size: 18px;
  font-weight: 600;
  padding: 10px;
  color: #181719;
  margin: 0;
}

.rec-card h4 {
  font-size: 14px;
  font-family: 'Telegraf', sans-serif;
  color: #5e5e5e;
  margin-bottom: 10px;
}

/*Section */
.section-container {
  padding: 40px;
  display: flex;
  justify-content: center;
  background-color: #0b1a2b90;
}

.section-content {
  display: flex;
  align-items: center;
  gap: 40px;
  max-width: 1200px;
}

.text-block {
  flex: 1;
}

.text-block h1 {
  font-size: 48px;
  margin-bottom: 10px;
  color: #09D1C7;
  font-weight: lighter;
}

.text-block h2 {
  font-size: 22px;
  color: #ffffff;
  margin-bottom: 20px;
  font-weight: lighter;
}

.text-block p {
  font-family: 'Telegraf', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: #fff;
}

.image-block {
  flex: 1;
  display: flex;
  justify-content: center;
}

.image-block img {
  width: 100%;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
}
</style>