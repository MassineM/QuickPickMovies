<template>
  <main>
    <navbar :loginBtnClick="user ? logout : showLoginPopUp"  :user="user"/>
    <loginPopUp v-show="loginPopUpIsShowen" :closePopUp="closeLoginPopUp" />
    <Nuxt />
    <footer>
      <h3>&copy; QuickPickMovies 2022</h3>
      <h4>All rights reserved</h4>
    </footer>
  </main>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export default {
  mounted: function () {},
  data() {
    return {
      loginPopUpIsShowen: false,
      user: {},
    };
  },
  mounted: function () {
    this.isConnected();
  },
  methods: {
    showLoginPopUp() {
      this.loginPopUpIsShowen = true;
    },
    closeLoginPopUp() {
      this.loginPopUpIsShowen = false;
    },
    logout() {
      signOut(getAuth()).then(() => {
        this.$router.push("/");
      });
    },
    isConnected() {
      onAuthStateChanged(getAuth(), (user) => {

        this.user = user;
        
        
      });
    },
  },
};
</script>

<style></style>
