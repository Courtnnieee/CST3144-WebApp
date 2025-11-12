<template>
  <div class="page-container">
    <!-- Search Bar -->
    <div class="search-bar">
      <input type="text" placeholder="🔍︎ Search" v-model="searchFilter" />
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


      <!-- Lesson cards -->
      <section class="lessonCards">
        <LessonCard v-for="(lesson, index) in AllsortingFilters" 
        :key="index" 
        :lesson="lesson" 
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import LessonCard from '../components/lessonCard.vue';
import { ref, onMounted, computed } from 'vue'

//lessons array hook data to json
const lessons = ref([])
onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/lessons')
    const data = await res.json()
    console.log('Lessons fetched:', data)
    lessons.value = data
  } catch (err) {
    console.error('Failed to fetch lessons:', err)
  }
})


//filter functionality
const searchFilter = ref('')
const sortAttribute = ref('')
const sortOrder = ref('asc')
const availability = ref('')

//lesson array filter sort
const AllsortingFilters = computed(() => {
let filtered = lessons.value

//search
 if (searchFilter.value) {
    const query = searchFilter.value.toLowerCase()
    filtered = filtered.filter(lesson =>
      lesson.subject.toLowerCase().includes(query) ||
      lesson.location.toLowerCase().includes(query) ||
      String(lesson.price).includes(query) ||
      String(lesson.space).includes(query)
    )
  }

  //availability
 filtered = filtered.filter(lesson => {
    if (availability.value === 'available') return lesson.space > 0
    if (availability.value === 'unavailable') return lesson.space === 0
    return true
  })

  //sort
  if (!sortAttribute.value) return filtered

  return filtered.sort((a, b) => {
    let valA = a[sortAttribute.value]
    let valB = b[sortAttribute.value]

    // Make string comparison case-insensitive
    if (typeof valA === 'string') valA = valA.toLowerCase()
    if (typeof valB === 'string') valB = valB.toLowerCase()

    if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1
    if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})



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
  /* stack filters and cards vertically */
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
</style>
