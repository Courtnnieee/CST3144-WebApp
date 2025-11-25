<template>
  <div class="centered-template">
    <img class="ombre-bg" src="../assets/Ombre background.png" alt="ombre background">

    <h1 class="logo-title">Fun Learning One Click Away</h1>
    <h3>Easily find and book after-school activities students will love. <br>
      Discover classes and prices tailored to their interests—all in one place.</h3>

    <router-link to="/lessons" custom v-slot="{ navigate }">
      <button class="btn" @click="navigate">Book a lesson</button>
    </router-link>
  </div>

  <div class="section-container">
    <div class="section-content">

      <div class="text-block">
        <h1>Parents empower your kids</h1>

        <h2>
          Enrolling your child in lessons helps them develop valuable skills,
          build confidence, and discover their passions.
        </h2>

        <p>
          Our platform offers a wide range of after-school classes designed to spark curiosity,
          build skills, and foster creativity. With expert instructors and flexible scheduling,
          your child can explore new passions while growing academically and socially.
        </p>
      </div>

      <div class="image-block">
        <img src="../assets/studystockimage.jpg" alt="Child learning">
      </div>

    </div>
  </div>



  <div class="reccomendation">
    <h2>Recommended Education Websites for Students</h2>

    <div class="reccomendation-cards">

      <a href="https://www.uplearn.co.uk/" target="_blank" class="rec-card">
        <img src="../assets/UpLearn.jpg" alt="UpLearn">
        <p class="rec-name">Uplearn</p>
        <h4>Up Learn provides everything you need to get an A*/A at A Level in your subject, as efficiently as possible.
          No need for textbooks or tutors.</h4>
      </a>

      <a href="https://quizlet.com/" target="_blank" class="rec-card">
        <img src="../assets/Quizlet.png" alt="Quizlet">
        <p class="rec-name">Quizlet</p>
        <h4>Master whatever you’re learning with Quizlet’s interactive flashcards, practice tests, and study activities.
        </h4>
      </a>

      <a href="https://www.ixl.com/" target="_blank" class="rec-card">
        <img src="../assets/ixl.png" alt="IXL">
        <p class="rec-name">IXL Learning</p>
        <h4>IXL is personalised learning with a comprehensive curriculum, individual guidance, and real-time analytics.
        </h4>
      </a>

      <a href="https://www.khanacademy.org/" target="_blank" class="rec-card">
        <img src="../assets/khanacademy.png" alt="Khan Academy">
        <p class="rec-name">Khan Academy</p>
        <h4>Khan Academy offers a free, world-class education to anyone, anywhere.</h4>
      </a>

    </div>
  </div>
</template>

<style scoped>
.centered-template {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 80vh;
  padding: 2rem 2rem 3rem;
  transform: translateY(-40px);
}

/*background behind content */
.ombre-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

/* Headline */
.centered-template h1 {
  font-weight: 500;
  font-size: 70px;
  color: #000;
  margin: 0;
  line-height: 1.1;
}

/* Subtitle */
.centered-template h3 {
  font-weight: 500;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
  margin: 2rem 0 2rem;
}

/* Button */
.btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #09D1C7 0%, #0ab3aa 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(9, 209, 199, 0.3);
}

.btn:hover {
  background: linear-gradient(135deg, #0c6478 0%, #094e5e 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(12, 100, 120, 0.4);
}

.btn:active {
  transform: translateY(0);
}

/* section */
.section-container {
  padding: 6rem 1rem;
  max-width: 1200px;
  margin: auto;
}

.section-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  flex-wrap: wrap;
}

/* Text area */
.text-block {
  flex: 1;
  min-width: 300px;
}

.text-block h1 {
  font-size: 3rem;
  color: #0c6478;
  margin-bottom: 1rem;
  font-weight: 700;
}

.text-block h2 {
  font-size: 1.4rem;
  color: #4a4a4a;
  margin-bottom: 1rem;
  font-weight: 500;
}

.text-block p {
  font-size: 1rem;
  line-height: 1.6;
  color: #5d5d5d;
  max-width: 550px;
}

/* Image area */
.image-block {
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
}

.image-block img {
  width: 100%;
  max-width: 420px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  object-fit: cover;
}

@media (max-width: 850px) {
  .section-content {
    flex-direction: column;
    text-align: center;
  }

  .text-block p {
    margin: auto;
  }

  .image-block img {
    max-width: 330px;
  }
}


/*Reccomendation */
.reccomendation {
  margin-top: 6rem;
  text-align: center;
  margin-bottom: 6rem;
}

.reccomendation h2 {
  font-size: 3rem;
  color: #0c6478;
  margin-bottom: 1rem;
  font-weight: 700;
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
  color: #5e5e5e;
  margin-bottom: 10px;
}
</style>