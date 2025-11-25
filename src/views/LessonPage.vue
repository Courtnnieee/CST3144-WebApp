<template>
  <div class="page-container">
<!-- Top image/banner -->
  <div class="page-banner">
    <img src="../assets/bookl.png" alt="Books Banner">
  </div>

    <!-- search Bar -->
    <div class="search-filter-card">
      <div class="search-wrapper">
        <input type="text" placeholder="🔍︎ Search lessons..." v-model="searchFilter" @input="doSearch" />
      </div>

      <!-- sort by -->
      <div class="filters-wrapper">
        <div class="filter-group">
          <label>Sort by:</label>
          <select v-model="sortAttribute">
            <option disabled value="">Select</option>
            <option value="subject">Subject</option>
            <option value="location">Location</option>
            <option value="price">Price</option>
          </select>

          <select v-model="sortOrder">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Availability:</label>
          <select v-model="availability">
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </div>
    </div>

    <!-- message -->
    <div v-if="showAddedMessage" class="added-message">
      <div class="checkmark">&#10004;</div>
      Added to cart
    </div>

    <!-- Lesson cards -->
    <section class="lessonCards">
      <LessonCard v-for="lesson in AllsortingFilters" :key="lesson._id" :lesson="lesson" @add-to-cart="doAddCart" />
    </section>
  </div>
</template>


<script setup>
import LessonCard from '../components/lessonCard.vue';
import { ref, computed, inject } from 'vue'

//lessons data
const lessons = inject('lessons')//reactive lessons share across pages


//filter functionality
const searchFilter = ref('')
const sortAttribute = ref('')
const sortOrder = ref('asc')
const availability = ref('')

async function doSearch() {
  try {
    let data
    if (!searchFilter.value) {
      const res = await fetch('http://localhost:3000/api/lessons')
      data = await res.json()
    } else {
      const res = await fetch(`http://localhost:3000/api/lessons/search?q=${searchFilter.value}`)
      const resData = await res.json()
      data = resData.data
    }
    // Update reactive lessons array without replacing the reference
    lessons.splice(0, lessons.length, ...data)//update array
  } catch (err) {
    console.error('Search failed:', err)
  }
}


//filter sort
const AllsortingFilters = computed(() => {
  let filtered = lessons

  //availability
  filtered = filtered.filter(l => {
    if (availability.value === 'available') return l.space > 0
    if (availability.value === 'unavailable') return l.space === 0
    return true
  })

  //sort
  if (!sortAttribute.value) return filtered

  return filtered.sort((a, b) => {
    let valA = a[sortAttribute.value]
    let valB = b[sortAttribute.value]

    //Make string comparison case-insensitive
    if (typeof valA === 'string') valA = valA.toLowerCase()
    if (typeof valB === 'string') valB = valB.toLowerCase()

    if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1
    if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

//adding card to checkout page
const addCardToCart = inject('cartActions')
const showAddedMessage = ref(false)

function doAddCart(lesson) {
  addCardToCart.addToCart(lesson)
  console.log('Adding lesson to cart:', lesson)

  showAddedMessage.value = true
  setTimeout(() => {
    showAddedMessage.value = false
  }, 2000)
}
</script>

<style scoped>
/* Page container */
.page-container {
  font-family: 'Inter', sans-serif;
  background-color: #f7f9fc;
  border-radius: 12px;
  margin: 2rem auto 10rem;
  padding: 1rem;
  max-width: 1200px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.page-banner {
  width: 100%;
  max-height: 280px;
  overflow: hidden;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.page-banner img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 16px;
  transition: transform 0.4s ease;
}

.page-banner img:hover {
  transform: scale(1.03);
}

.search-filter-card {
  background-color: #fff;
  border-radius: 16px;
  padding: 1.5rem 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;
}

/* Search bar */
.search-wrapper input {
  width: 97%;
  padding: 0.8rem 1rem;
  border-radius: 30px;
  border: 2px solid #ccc;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-wrapper input:focus {
  border-color: #06a89a;
  box-shadow: 0 2px 12px rgba(9, 209, 199, 0.3);
  outline: none;
}

.filters-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  justify-content: flex-start;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 500;
  color: #333;
}

.filter-group label {
  font-size: 0.95rem;
}

/* Filter selects */
.filter-group select {
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-group select:hover,
.filter-group select:focus {
  border-color: #09d1c7;
  outline: none;
  box-shadow: 0 2px 8px rgba(9, 209, 199, 0.3);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .filters-wrapper {
    flex-direction: column;
    gap: 1rem;
  }
}

/* Lesson cards container */
.lessonCards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* Added-to-cart message */
.added-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  color: #222;
  padding: 1.5rem 2.5rem;
  border-radius: 18px;
  font-size: 1.2rem;
  font-weight: 600;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
  opacity: 0;
  animation: fadePop 1.9s ease forwards;
}

.checkmark {
  font-size: 2.2rem;
  color: #37c46c;
  margin-bottom: 0.5rem;
  animation: popScale 0.4s ease;
}

@keyframes fadePop {
  0% {
    opacity: 0;
    transform: translate(-50%, -45%);
  }

  15% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }

  85% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -55%);
  }
}

@keyframes popScale {
  0% {
    transform: scale(0.6);
  }

  100% {
    transform: scale(1);
  }
}

.lessonCards>* {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.lessonCards>*:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
</style>
