<template>
  <div class="cards">
    <img :src="`http://localhost:3000/images/${lesson.image}`" :alt="lesson.subject" />
    <h2>{{ lesson.subject }}</h2>
    <h3> {{ lesson.location }}</h3>
    <p>£{{ lesson.price }}</p>
    <p>{{ lesson.space }} spaces left</p>
    <button class="add-btn" :disabled="lesson.space === 0" @click="addToCart">
      {{ lesson.space === 0 ? 'This Lesson is Currently Full' : 'Add to Cart' }}
    </button>
  </div>
</template>


<script>
export default {
  name: 'LessonCard',
  props: {
    lesson: Object
  },
  emits: ['add-to-cart'],
  methods: {
    addToCart() {
        this.$emit('add-to-cart', this.lesson)
      }
    }
  }
</script>


<style scoped>
/* Individual lesson card */
.cards {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cards:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.cards img {
  width: 100%;
  height: 150px;
  object-fit: contain;
  border-radius: 6px;
  margin-bottom: 0.8rem;
}

.cards h2 {
  color: #0c6478;
}

.cards h3 {
  color: #15919B;
}

/* add to cart button */
.add-btn {
  margin-top: 0.5rem;
  padding: 0.6rem;
  background-color: #09D1C7;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.add-btn:hover:not(:disabled) {
  background-color: #0c6478;
  transform: scale(1.03);
}

.add-btn:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>