<template>
  <nav class="nav-container">
    <burgerBtn />
    <div class="logo-container">
      <img src="../assets/Images/Logo.png" class="logo-img" />
    </div>
    <div class="actions-container">
      <buttonPrimary v-if="!user" text="Login" :eventHandler="loginBtnClick" />
      <buttonPrimary v-else text="Logout" :eventHandler="loginBtnClick" />
    </div>
  </nav>
</template>

<script>
import { getAuth,  onAuthStateChanged} from "firebase/auth";
export default {
  props:{loginBtnClick: Function,
  user: Object},
  data: () => {
    return {
    };
  },
  mounted: function() {
  },
  methods: {},
};
</script>

<style></style>
