<template>
  <div class="hero-container">
      <div class="hero-container-title">
          <h1>{{props.titleOriginal}}</h1>
      </div>
      <div class="hero-container-description">
          <p>{{props.description}}</p>
      </div>
      <div class="hero-container-genres">

      </div>
      <div class="hero-container-year">

      </div>
      <div class="hero-container-rating">

      </div>
  </div>
</template>

<script>
export default {
    props: {
    titleOriginal: String,
    description : String,
    // genres: Array,
    // year : Number,
    // rating: Number
  },
};
</script>

<style></style>
