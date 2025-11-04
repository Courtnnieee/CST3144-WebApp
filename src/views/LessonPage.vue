<template>
  <h1 class="page-title">After School Class & Activities</h1>

  <div class="page-container">
    <!-- Search Bar -->
    <div class="search-bar">
      <input type="text" placeholder="Search lessons..." />
    </div>

    <div class="layout">
      <!-- Left Sidebar -->
      <aside class="sidebar">

        <div class="sort-container">
          <h4>Sort Lessons By</h4>
          <select v-model="sortAttribute">
            <option disabled value="">Select</option>
            <option value="subject">Subject</option>
            <option value="location">Location</option>
            <option value="price">Price</option>
            <option value="space">Availability</option>
          </select>

          <h4>Order</h4>
          <label>
            <input type="radio" value="asc" v-model="sortOrder" /> Ascending
            <input type="radio" value="desc" v-model="sortOrder" /> Descending
          </label>

        </div>
      </aside>

      <!-- Right Lesson Cards -->
      <section class="lessonCards">
        <LessonCard v-for="(lesson, index) in lessons" :key="index" :lesson="lesson" />
      </section>
    </div>
  </div>
</template>

<script>
import LessonCard from '../components/lessonCard.vue';

export default {
  name: 'App',
  components: {
    LessonCard
  },
  data() {
    return {
      lessons: [
        {
          subject: "Math",
          location: "Hendon",
          price: 95,
          space: 5,
          image: "Maths.png"
        },

        {
          subject: "Biology",
          location: "Brent Cross",
          price: 70,
          space: 5,
          image: 'Biology.png'
        },

        {
          subject: "English",
          location: "Liverpool Street",
          price: 40,
          space: 5,
          image: 'English.png'
        },

        {
          subject: "Drama",
          location: "Morden",
          price: 100,
          space: 8,
          image: '/Drama.png'
        }
      ]
    };
  }
};

</script>

<style scoped>
.page-title {
  text-align: center;
  font-size: 2rem;
  color: #09D1C7;
  font-weight: 700;
  margin: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* General page layout */
.page-container {
  font-family: Arial, sans-serif;
  background-color: #ffffff75;
  border-radius: 8px;
  margin-bottom: 10rem;
}

/* Search bar */
.search-bar {
  text-align: center;
  padding: 1rem;
}

.search-bar input {
  width: 50%;
  max-width: 400px;
  padding: 0.6rem;
  border: 3px solid #09D1C7;
  border-radius: 20px;
  font-size: 1rem;
  transition: 0.3s;
}

/* Layout wrapper */
.layout {
  display: flex;
  gap: 1rem;
  padding: 0 1rem 2rem;
}

/* Sidebar styles */
.sidebar {
  flex: 0 0 220px;
  padding: 1rem;
  background-color: #09D1C7;
  color: white;
  border-radius: 8px;
  height: fit-content;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.sidebar h4 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
}




/* Lesson cards container */
.lessonCards {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}
</style>
