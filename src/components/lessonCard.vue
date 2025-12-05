<template>
  <div class="cards">
    <img :src="`https://cst3144-webappbackend.onrender.com/images/${lesson.image}`" :alt="lesson.subject" />
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
    lesson: {
      type: Object,
      required: true
    }
  },
  emits: ['add-to-cart'],
  methods: {
    addToCart() {
      if (this.lesson.space > 0) { //spaces ->add to cart +data
        this.$emit('add-to-cart', this.lesson)
      }
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

.cards h3::before {
  content: "📍";
  font-size: 0.9rem;
}

.cards p:last-of-type {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
  padding: 0.4rem 0.75rem;
  background-color: #f0f9f9;
  border-radius: 6px;
  display: inline-block;
  width: fit-content;
}

/* add to cart button */
.add-btn {
  margin-top: 0.5rem;
  padding: 0.6rem;
  background: linear-gradient(135deg, #09D1C7 0%, #0ab3aa 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(9, 209, 199, 0.3);
}

.add-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #0c6478 0%, #094e5e 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(12, 100, 120, 0.4);
}

.add-btn:active:not(:disabled) {
  transform: translateY(0);
}

.add-btn:disabled {
  background: linear-gradient(135deg, #d4d4d4 0%, #b8b8b8 100%);
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: none;
  font-size: 0.9rem;
  color: #666;
}
</style>