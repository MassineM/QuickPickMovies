<template>
  <main>
    
    <div class="is-loading" v-if="isLoading">
      <div class="loadingio-spinner-rolling-x6g2h8upmdg"><div class="ldio-es3wjty6r1j">
      <div></div>
      </div></div>
      
    </div>
    
    <v-container class="is-loaded" v-else>
      <v-row class="hero-section-container">
        <v-col cols="4">
          <v-carousel hide-delimiters  v-model="currentIndex">
          <v-carousel-item
            v-for="(item,i) in covers"
            :key="i"
            :src="(item ? item.src || item.image : null)"
          >
          </v-carousel-item>
        </v-carousel>
        </v-col>
        <v-col cols="8">
          <div class="hero-section-details">
              <div class="hero-container">
                <div class="hero-container-title">
                    <h1>{{covers[currentIndex].titleOriginal}}</h1>
                </div>
                <div class="hero-container-description">
                    <p>
                      <span class="hero-container-label">Description: </span>{{covers[currentIndex].description}}</p>
                </div>
                <div class="hero-container-year">
                  <span class="hero-container-label">Release Date:</span> {{covers[currentIndex].release}}
                </div>
                <div class="hero-container-rating">
                  <svg class="hero-container-rating-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="m11.65 44 4.65-15.2L4 20h15.2L24 4l4.8 16H44l-12.3 8.8L36.35 44 24 34.6Z"/></svg>    
                  {{covers[currentIndex].rating}}
                </div>
                <div class="hero-container-genres">
                    <ul class="hero-container-genres-list">
                      <li v-for="(genre, index) in covers[currentIndex].genres" :key="index">
                        {{genre.name}}
                      </li>
                    </ul>
                </div>
              </div>
          </div>
        </v-col>
      </v-row>        
    </v-container>

    <div class="movies-list-container">
      <div v-for="(key, i) of Object.keys(displayMovies) " :key="i" class="movies-list-container-container">
        <div class="movies-list-container-container-header">
          <h2>{{key}}</h2>
        </div>
        <div class="movies-list-container-container-body">
          <ul>
            <li v-for="(movie,j) of displayMovies[key]" :key="j" @click="showMovieDetails(movie)">
              <img :src="movie.image || movie.src" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <movie-pop-up @close="closeModal($event)" :movie="triggeredMovie" v-if="showDetails" :user="user"/>
  </main>
  
</template>

<script>
import {PROTOTYPE} from "@/assets/moviesListPrototype";
import moviePopUp from '../components/movie-pop-up.vue';
// import moviePopUp from '../components/movie-pop-up.vue';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  components: { moviePopUp },
  // components: { moviePopUp },
  name: "IndexPage",
  mounted: function () {
    console.log(this.user);
    this.initListMovies();
    for(let key of Object.keys(this.prototype)){
      this.keys.push({ [key] : this.prototype[key]});
    }
    this.isConnected();
  },
  computed:{
      loadedComponent(){
        return this.components[this.$route.query.extension] ?? null;
      }
    },
  data() {
    return {
      currentIndex : 0,
      keys : [],
      isLoading: false,
      user : null,
      // moviesList: [],
      moviesList : PROTOTYPE,
      covers : [
        {
          "actors": [], "directors": [], "escritors": [], "otherTitles": [], "_id": "61e8a4c3f2eb8ced20633f4a", "src": "https://image.tmdb.org/t/p/w300/6zUkjB5OtiFhN2DiqdT1IllNJTa.jpg", "title": "Fast & Furious 6 (A todo gas 6)", "rating": "6.7/10", "year": "2013", "titleOriginal": "Fast & Furious 6", "uuid": "fast-furious-6-a-todo-gas-6-", "description": "Desde que Dom y Brian destruyeron el imperio de un mafioso y se hicieron con cien millones de dólares, se encuentran en paradero desconocido; no pueden regresar a casa porque la ley los persigue. Entretanto, Hobbs ha seguido la pista por una docena de países a una banda de letales conductores mercenarios, cuyo cerebro cuenta con la inestimable ayuda de la sexy Letty, un viejo amor de Dom que éste daba por muerta. La única forma de detenerlos es enfrentarse a ellos en las calles, así que Hobbs le pide a Dom que reúna a su equipo en Londres. ¿Qué obtendrán a cambio? Un indulto para que todos puedan volver a casa con sus familias..", 
          "genres": [ { "name": "Acción", "uuid": "accion" }, { "name": "Crimen", "uuid": "crimen" }, { "name": "Suspense", "uuid": "suspense" } ], "countries": [ { "name": "USA", "uuid": "usa" } ], "release": "24 May 2013", "embedUrls": [ { "server": "fembed", "url": "https://dutrag.com/v/mrlrqi5-m6qzk88", "priority": 4 }, { "server": "doodstream", "url": "https://dood.to/e/5nxo5aln90jk", "priority": 3 }, { "server": "streamtape", "url": "https://streamtape.com/e/yPKdlj73rLS1YVB/", "priority": 3 }, { "server": "uqload", "url": "https://uqload.com/embed-59u590xxarvw.html", "priority": 2 }, { "server": "upstream", "url": "https://upstream.to/embed-4tcvp9tf3wuo.html", "priority": 1 }, { "server": "streamsb", "url": "https://pelistop.co/embed-pift9qy6zank.html", "priority": 0 }, { "server": "mystream", "url": "https://embed.mystream.to/bl331lli54oz", "priority": 0 }, { "server": "mobile", "url": "https://fastplay.to/embed-hsx6107ppq8g.html", "priority": 0 }, { "server": "streamsb", "url": "https://streamsb.net/embed-fijczkxxdqc9.html", "priority": 5 } ], "index": 39, "episodes": [], "createdAt": "2022-01-19T23:54:43.646Z", "updatedAt": "2022-01-23T01:18:46.318Z"
        },
        {
          "actors": [], "directors": [], "escritors": [], "otherTitles": [], "_id": "61e8a4c3f2eb8ced20633f4a", "src": "https://image.tmdb.org/t/p/w300/6zUkjB5OtiFhN2DiqdT1IllNJTa.jpg", "title": "Fast & Furious 6 (A todo gas 6)", "rating": "6.7/10", "year": "2013", "titleOriginal": "Fast & Furious 6", "uuid": "fast-furious-6-a-todo-gas-6-", "description": "Desde que Dom y Brian destruyeron el imperio de un mafioso y se hicieron con cien millones de dólares, se encuentran en paradero desconocido; no pueden regresar a casa porque la ley los persigue. Entretanto, Hobbs ha seguido la pista por una docena de países a una banda de letales conductores mercenarios, cuyo cerebro cuenta con la inestimable ayuda de la sexy Letty, un viejo amor de Dom que éste daba por muerta. La única forma de detenerlos es enfrentarse a ellos en las calles, así que Hobbs le pide a Dom que reúna a su equipo en Londres. ¿Qué obtendrán a cambio? Un indulto para que todos puedan volver a casa con sus familias..", "genres": [ { "name": "Acción", "uuid": "accion" }, { "name": "Crimen", "uuid": "crimen" }, { "name": "Suspense", "uuid": "suspense" } ], "countries": [ { "name": "USA", "uuid": "usa" } ], "release": "24 May 2013", "embedUrls": [ { "server": "fembed", "url": "https://dutrag.com/v/mrlrqi5-m6qzk88", "priority": 4 }, { "server": "doodstream", "url": "https://dood.to/e/5nxo5aln90jk", "priority": 3 }, { "server": "streamtape", "url": "https://streamtape.com/e/yPKdlj73rLS1YVB/", "priority": 3 }, { "server": "uqload", "url": "https://uqload.com/embed-59u590xxarvw.html", "priority": 2 }, { "server": "upstream", "url": "https://upstream.to/embed-4tcvp9tf3wuo.html", "priority": 1 }, { "server": "streamsb", "url": "https://pelistop.co/embed-pift9qy6zank.html", "priority": 0 }, { "server": "mystream", "url": "https://embed.mystream.to/bl331lli54oz", "priority": 0 }, { "server": "mobile", "url": "https://fastplay.to/embed-hsx6107ppq8g.html", "priority": 0 }, { "server": "streamsb", "url": "https://streamsb.net/embed-fijczkxxdqc9.html", "priority": 5 } ], "index": 39, "episodes": [], "createdAt": "2022-01-19T23:54:43.646Z", "updatedAt": "2022-01-23T01:18:46.318Z"
        },
        {
          "actors": [], "directors": [], "escritors": [], "otherTitles": [], "_id": "61e8a4c3f2eb8ced20633f4a", "src": "https://image.tmdb.org/t/p/w300/6zUkjB5OtiFhN2DiqdT1IllNJTa.jpg", "title": "Fast & Furious 6 (A todo gas 6)", "rating": "6.7/10", "year": "2013", "titleOriginal": "Fast & Furious 6", "uuid": "fast-furious-6-a-todo-gas-6-", "description": "Desde que Dom y Brian destruyeron el imperio de un mafioso y se hicieron con cien millones de dólares, se encuentran en paradero desconocido; no pueden regresar a casa porque la ley los persigue. Entretanto, Hobbs ha seguido la pista por una docena de países a una banda de letales conductores mercenarios, cuyo cerebro cuenta con la inestimable ayuda de la sexy Letty, un viejo amor de Dom que éste daba por muerta. La única forma de detenerlos es enfrentarse a ellos en las calles, así que Hobbs le pide a Dom que reúna a su equipo en Londres. ¿Qué obtendrán a cambio? Un indulto para que todos puedan volver a casa con sus familias..", "genres": [ { "name": "Acción", "uuid": "accion" }, { "name": "Crimen", "uuid": "crimen" }, { "name": "Suspense", "uuid": "suspense" } ], "countries": [ { "name": "USA", "uuid": "usa" } ], "release": "24 May 2013", "embedUrls": [ { "server": "fembed", "url": "https://dutrag.com/v/mrlrqi5-m6qzk88", "priority": 4 }, { "server": "doodstream", "url": "https://dood.to/e/5nxo5aln90jk", "priority": 3 }, { "server": "streamtape", "url": "https://streamtape.com/e/yPKdlj73rLS1YVB/", "priority": 3 }, { "server": "uqload", "url": "https://uqload.com/embed-59u590xxarvw.html", "priority": 2 }, { "server": "upstream", "url": "https://upstream.to/embed-4tcvp9tf3wuo.html", "priority": 1 }, { "server": "streamsb", "url": "https://pelistop.co/embed-pift9qy6zank.html", "priority": 0 }, { "server": "mystream", "url": "https://embed.mystream.to/bl331lli54oz", "priority": 0 }, { "server": "mobile", "url": "https://fastplay.to/embed-hsx6107ppq8g.html", "priority": 0 }, { "server": "streamsb", "url": "https://streamsb.net/embed-fijczkxxdqc9.html", "priority": 5 } ], "index": 39, "episodes": [], "createdAt": "2022-01-19T23:54:43.646Z", "updatedAt": "2022-01-23T01:18:46.318Z"
        },
        {
          "actors": [], "directors": [], "escritors": [], "otherTitles": [], "_id": "61e8a4c3f2eb8ced20633f4a", "src": "https://image.tmdb.org/t/p/w300/6zUkjB5OtiFhN2DiqdT1IllNJTa.jpg", "title": "Fast & Furious 6 (A todo gas 6)", "rating": "6.7/10", "year": "2013", "titleOriginal": "Fast & Furious 6", "uuid": "fast-furious-6-a-todo-gas-6-", "description": "Desde que Dom y Brian destruyeron el imperio de un mafioso y se hicieron con cien millones de dólares, se encuentran en paradero desconocido; no pueden regresar a casa porque la ley los persigue. Entretanto, Hobbs ha seguido la pista por una docena de países a una banda de letales conductores mercenarios, cuyo cerebro cuenta con la inestimable ayuda de la sexy Letty, un viejo amor de Dom que éste daba por muerta. La única forma de detenerlos es enfrentarse a ellos en las calles, así que Hobbs le pide a Dom que reúna a su equipo en Londres. ¿Qué obtendrán a cambio? Un indulto para que todos puedan volver a casa con sus familias..", "genres": [ { "name": "Acción", "uuid": "accion" }, { "name": "Crimen", "uuid": "crimen" }, { "name": "Suspense", "uuid": "suspense" } ], "countries": [ { "name": "USA", "uuid": "usa" } ], "release": "24 May 2013", "embedUrls": [ { "server": "fembed", "url": "https://dutrag.com/v/mrlrqi5-m6qzk88", "priority": 4 }, { "server": "doodstream", "url": "https://dood.to/e/5nxo5aln90jk", "priority": 3 }, { "server": "streamtape", "url": "https://streamtape.com/e/yPKdlj73rLS1YVB/", "priority": 3 }, { "server": "uqload", "url": "https://uqload.com/embed-59u590xxarvw.html", "priority": 2 }, { "server": "upstream", "url": "https://upstream.to/embed-4tcvp9tf3wuo.html", "priority": 1 }, { "server": "streamsb", "url": "https://pelistop.co/embed-pift9qy6zank.html", "priority": 0 }, { "server": "mystream", "url": "https://embed.mystream.to/bl331lli54oz", "priority": 0 }, { "server": "mobile", "url": "https://fastplay.to/embed-hsx6107ppq8g.html", "priority": 0 }, { "server": "streamsb", "url": "https://streamsb.net/embed-fijczkxxdqc9.html", "priority": 5 } ], "index": 39, "episodes": [], "createdAt": "2022-01-19T23:54:43.646Z", "updatedAt": "2022-01-23T01:18:46.318Z"
        }
      ],
      prototype : { "actors": [], "directors": [], "escritors": [], "otherTitles": [], "_id": "61e8a4c3f2eb8ced20633f4a", "image": "https://image.tmdb.org/t/p/w300/6zUkjB5OtiFhN2DiqdT1IllNJTa.jpg", "title": "Fast & Furious 6 (A todo gas 6)", "rating": "6.7/10", "year": "2013", "titleOriginal": "Fast & Furious 6", "uuid": "fast-furious-6-a-todo-gas-6-", "description": "Desde que Dom y Brian destruyeron el imperio de un mafioso y se hicieron con cien millones de dólares, se encuentran en paradero desconocido; no pueden regresar a casa porque la ley los persigue. Entretanto, Hobbs ha seguido la pista por una docena de países a una banda de letales conductores mercenarios, cuyo cerebro cuenta con la inestimable ayuda de la sexy Letty, un viejo amor de Dom que éste daba por muerta. La única forma de detenerlos es enfrentarse a ellos en las calles, así que Hobbs le pide a Dom que reúna a su equipo en Londres. ¿Qué obtendrán a cambio? Un indulto para que todos puedan volver a casa con sus familias..", "genres": [ { "name": "Acción", "uuid": "accion" }, { "name": "Crimen", "uuid": "crimen" }, { "name": "Suspense", "uuid": "suspense" } ], "countries": [ { "name": "USA", "uuid": "usa" } ], "release": "24 May 2013", "embedUrls": [ { "server": "fembed", "url": "https://dutrag.com/v/mrlrqi5-m6qzk88", "priority": 4 }, { "server": "doodstream", "url": "https://dood.to/e/5nxo5aln90jk", "priority": 3 }, { "server": "streamtape", "url": "https://streamtape.com/e/yPKdlj73rLS1YVB/", "priority": 3 }, { "server": "uqload", "url": "https://uqload.com/embed-59u590xxarvw.html", "priority": 2 }, { "server": "upstream", "url": "https://upstream.to/embed-4tcvp9tf3wuo.html", "priority": 1 }, { "server": "streamsb", "url": "https://pelistop.co/embed-pift9qy6zank.html", "priority": 0 }, { "server": "mystream", "url": "https://embed.mystream.to/bl331lli54oz", "priority": 0 }, { "server": "mobile", "url": "https://fastplay.to/embed-hsx6107ppq8g.html", "priority": 0 }, { "server": "streamsb", "url": "https://streamsb.net/embed-fijczkxxdqc9.html", "priority": 5 } ], "index": 39, "episodes": [], "createdAt": "2022-01-19T23:54:43.646Z", "updatedAt": "2022-01-23T01:18:46.318Z" },
      displayMovies : {},
      genres : new Set(),
      showDetails: false,
      triggeredMovie: null
    };
  },
  methods: {
    async initListMovies() {
      this.isLoading = true;
      this.genres = await this.getGenres();
      this.fillGenresWithMovies();
      this.covers = this.moviesList.sort(() => 0.5 - Math.random()).slice(0,4); 
      this.isLoading = false;
      
    
      // To avoid calls
      // return ;
      // for (let i = 1; i <= 4; i++) {
      //   this.$getAllMovies(i)
      //     .then(async (data) => {
      //       for (let item of data.data.results) {
      //         this.moviesList.push(item);
      //         if (this.moviesList.length === 96){ 
      //           this.genres = await this.getGenres();
      //           this.fillGenresWithMovies();
      //           this.covers = this.moviesList.sort(() => 0.5 - Math.random()).slice(0,4); 
      //           this.isLoading = false;
      //         }
      //       }

            
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }
    },
    getGenres(){
      return new Promise((resolve)=>{
        let genre = this.moviesList.map((x)=> x.genres)
        let response = [];
        for(let item of genre){
          
          for(let y of item.map((x) => x.name )){
            response.push(y);
          }
        }
        return resolve([...new Set(response)]);
      })

    },
    fillGenresWithMovies(){
      for(let g of this.genres){
      
        
        this.displayMovies[g.toString()] = this.moviesList.filter((x) => 
                                            x.genres.map((y) => y.name).includes(g)
                                          )
      }
    },
    showMovieDetails(movie){
this.triggeredMovie = movie;
this.showDetails = true;
    },
    closeModal(){
      this.showDetails= false;
this.triggeredMovie = null;
    },
  isConnected() {
      onAuthStateChanged(getAuth(), (user) => {
        console.log(user)
        this.user = user;
      });
    },
  },
  
};
</script>

<style>
  .v-window__next{
    left : calc(90% - 20px);
  }
</style>
