import  axios from 'axios';

const API_ENDPOINT = process.env.API_URL;
const API_KEY = process.env.API_KEY;
// const API_USER = process.env.API_USER;

export default ({ store }, inject) => {

  inject('get', (route) => {
    let headers = { headers: { 'Authorization': store.state.auth ? store.state.auth.token : "" } }

    return new Promise((resolve, reject) => {
      axios.get(process.env.api_uri + route, headers).then(function (response) {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  })

  inject('post', (route, body = {}, isUpload = false, progressCallback = console.log) => {
    let headers = !isUpload ? {
      headers:
        { 'Authorization': store.state.auth ? store.state.auth.token : "" }
    } : {
      headers: {
        'Authorization': store.state.auth ? store.state.auth.token : "",
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: progressCallback
    };

    return new Promise((resolve, reject) => {
      axios.post(process.env.api_uri + route, body, headers
      ).then(function (response) {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  })

  inject('patch', (route, body = {}) => {
    let headers = { headers: { 'Authorization': store.state.auth ? store.state.auth.token : "" } }

    return new Promise((resolve, reject) => {
      axios.patch(process.env.api_uri + route, body, headers
      ).then(function (response) {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  })

//   inject('put', (route, body = {}) => {
//     let headers = { headers: { 'Authorization': store.state.auth ? store.state.auth.token : "" } }

//     return new Promise((resolve, reject) => {
//       axios.put(process.env.api_uri + route, body, headers
//       ).then(function (response) {
//         resolve(response)
//       }).catch((err) => {
//         reject(err)
//       })
//     })
//   })

  inject('del', (route) => {
    let headers = { headers: { 'Authorization': store.state.auth ? store.state.auth.token : "" } }

    return new Promise((resolve, reject) => {
      axios.delete(process.env.api_uri + route, headers
      ).then(function (response) {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  })

  inject('getAllMovies', (page) => {
    // let headers = { headers: { 'Authorization': store.state.auth ? store.state.auth.token : "" } }
    let params = {
      'page' : page.toString()
    } 
    let headers = {
      'X-RapidAPI-Host': "movies-app1.p.rapidapi.com",
      'X-RapidAPI-Key': API_KEY,
    }
    let options = {
      params : params,
      headers: headers
    };
    
    return new Promise((resolve, reject) => {
      axios.get(API_ENDPOINT + "/movies", options).then(function (response) {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  })
}
