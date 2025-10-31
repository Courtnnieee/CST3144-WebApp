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
        <h4>Sort By</h4>
        <div class="sort-by">
          <label>
            <input type="radio" name="sort-by" value="subject" checked /> Subject
          </label><br />
          <label>
            <input type="radio" name="sort-by" value="price" /> Price
          </label><br />
          <label>
            <input type="radio" name="sort-by" value="location" /> Location
          </label><br />
          <label>
            <input type="radio" name="sort-by" value="availability" /> Availability
          </label>
        </div>

        <h4>Order</h4>
        <div class="order">
          <label>
            <input type="radio" name="order" value="asc" checked /> Ascending
          </label><br />
          <label>
            <input type="radio" name="order" value="desc" /> Descending
          </label>
        </div>
      </aside>

      <!-- Right Lesson Cards -->
      <section class="lessonCards">
        <div class="cards">
          <img src="../assets/maths.png" alt="Lesson Image" />
          <h3>Subject: Math</h3>
          <h3>Location: Hendon</h3>
          <h3>Price: £50</h3>
          <h3>Spaces Left: 3</h3>
          <button class="add-btn">Add to Cart</button>
        </div>

        <div class="cards">
          <img src="../assets/science.png" alt="Lesson Image" />
          <h3>Subject: Science</h3>
          <h3>Location: Brent Cross</h3>
          <h3>Price: £70</h3>
          <h3>Spaces Left: 5</h3>
          <button class="add-btn">Add to Cart</button>
        </div>

        <div class="cards">
          <img src="../assets/english.png" alt="Lesson Image" />
          <h3>Subject: English</h3>
          <h3>Location: Liverpool Street</h3>
          <h3>Price: £40</h3>
          <h3>Spaces Left: 2</h3>
          <button class="add-btn">Add to Cart</button>
        </div>

        <div class="cards">
          <img src="../assets/drama.png" alt="Lesson Image" />
          <h3>Subject: Drama</h3>
          <h3>Location: Morden</h3>
          <h3>Price: £100</h3>
          <h3>Spaces Left: 8</h3>
          <button class="add-btn">Add to Cart</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>


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

.sidebar label {
  cursor: pointer;
  font-size: 0.95rem;
}

.sidebar input[type="radio"] {
  margin-right: 6px;
}

/* Lesson cards container */
.lessonCards {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

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
  object-fit:contain;
  border-radius: 6px;
  margin-bottom: 0.8rem;
}

.cards h3 {
  margin: 0.3rem 0;
  font-size: 0.95rem;
  color: #333;
}

/* Add to cart button */
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
