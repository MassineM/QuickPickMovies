<template>
  <div class="movie-popup popup">
      <div class="movie-popup-overlay" @click="close()"></div>
      <div class="movie-popup-body">
          <div class="movie-popup-body-img">
            <img :src="movie.image || movie.src" />
            <div class="action-container" v-show="user">
              <button class="action-container-add" v-if="!isWishList" @click="isWishList = !isWishList">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="m24 41.95-2.05-1.85q-8.15-7.45-13.05-13T4 15.85q0-4.5 3.025-7.525Q10.05 5.3 14.5 5.3q2.55 0 5.05 1.225T24 10.55q2.2-2.8 4.55-4.025Q30.9 5.3 33.5 5.3q4.45 0 7.475 3.025Q44 11.35 44 15.85q0 5.7-4.9 11.25t-13.05 13Zm0-18.8ZM24 38q7.6-7 12.3-12.15 4.7-5.15 4.7-10 0-3.3-2.125-5.425T33.5 8.3q-2.5 0-4.7 1.55t-3.6 4.45h-2.45q-1.35-2.9-3.575-4.45Q16.95 8.3 14.5 8.3q-3.3 0-5.4 2.125Q7 12.55 7 15.85q0 4.85 4.7 10T24 38Z"/></svg>
                Add to wishlist
              </button>

              <button class="action-container-add" v-else @click="isWishList = !isWishList">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="m24 41.95-2.05-1.85q-8.15-7.45-13.05-13T4 15.85q0-4.5 3.025-7.525Q10.05 5.3 14.5 5.3q2.55 0 5.05 1.225T24 10.55q2.2-2.8 4.55-4.025Q30.9 5.3 33.5 5.3q4.45 0 7.475 3.025Q44 11.35 44 15.85q0 5.7-4.9 11.25t-13.05 13Z"/></svg>
                  Remove from wishlist
              </button>
            </div>
          </div>
          <div class="movie-popup-bodyy">
                <div class="movie-popup-bodyy-title">
                    <h1>{{movie.titleOriginal}}</h1>
                </div>
                <div class="movie-popup-bodyy-description">
                    <p>
                      <span class="movie-popup-bodyy-label">Description: </span>{{movie.description}}</p>
                </div>
                <div class="movie-popup-bodyy-year">
                  <span class="movie-popup-bodyy-label">Release Date:</span> {{movie.release}}
                </div>
                <div class="movie-popup-bodyy-rating">
                  <svg class="movie-popup-bodyy-rating-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="m11.65 44 4.65-15.2L4 20h15.2L24 4l4.8 16H44l-12.3 8.8L36.35 44 24 34.6Z"/></svg>    
                  {{movie.rating}}
                </div>
                <div class="movie-popup-bodyy-genres">
                    <ul class="movie-popup-bodyy-genres-list">
                      <li v-for="(genre, index) in movie.genres" :key="index">
                        {{genre.name}}
                      </li>
                    </ul>
                </div>
              </div>
      </div>
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      isWishList : false,
    }
    },
    props: [
      "movie",
      "user"
    ],
     methods:{
       close(){
         this.$emit("close");
       }
     }
}
</script>

<style>

</style>