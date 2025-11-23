<template>
  <div class="page-container">
    <!-- Search Bar -->
    <div class="search-bar">
      <input type="text" placeholder="🔍︎ Search" v-model="searchFilter" @input="doSearch" />
    </div>


    <div class="layout">
      <!-- Filters on top of cards -->
      <div class="filters">
        <!-- Sort controls -->
        <select v-model="sortAttribute">
          <option disabled value="">☰ Filter</option>
          <option value="subject">Subject</option>
          <option value="location">Location</option>
          <option value="price">Price</option>
        </select>

        <select v-model="sortOrder">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <!-- Availability filter -->
        <select v-model="availability">
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>

      <div v-if="showAddedMessage" class="added-message">
        <div class="checkmark">&#10004;</div>
        Added to cart
      </div>


      <!-- Lesson cards -->
      <section class="lessonCards">
        <LessonCard v-for="lesson in AllsortingFilters" :key="lesson._id" :lesson="lesson" @add-to-cart="doAddCart" />
      </section>
    </div>
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
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem 2rem;
}

.filters {
  background-color: #09D1C7;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  font-family: sans-serif;
}

/* dropdowns */
.filters select {
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.filters select:hover,
.filters select:focus {
  background-color: #0c6478;
  color: white;
  outline: none;
}

/* Lesson cards container */
.lessonCards {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.added-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  color: #222;
  padding: 1.4rem 2.2rem;
  border-radius: 16px;
  font-size: 1.2rem;
  font-weight: 600;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  text-align: center;
  opacity: 0;
  animation: fadePop 1.9s ease forwards;
}

.checkmark {
  font-size: 2rem;
  color: #37c46c;
  margin-bottom: 0.4rem;
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
</style>
