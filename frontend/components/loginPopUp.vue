<template>
  <div class="popup">
    <div class="popup_overlay" @click="closePopUp"></div>
    <div class="popup_body">
      <div class="popup_header">
        <h1>
          {{ loginMode ? "Welcome Back" : "Welcome To Quick Pick Movies" }}
        </h1>
        <h3>{{ loginMode ? "Log into your account" : "Create an account" }}</h3>
      </div>
      <form>
        <div
          class="form-element"
          v-for="(formInput, index) of formInputs"
          :key="index"
        >
          <label
            :for="formInput.name"
            v-if="(loginMode && formInput.mode) || !loginMode"
            >{{ formInput.label }}</label
          >
          <input
            v-if="(loginMode && formInput.mode) || !loginMode"
            :type="formInput.type"
            :placeholder="formInput.placeholder"
            :name="formInput.name"
            v-model="user[formInput.name]"
            class="form-element-field"
          />
        </div>
        <p v-if="errMsg" class="err-message">{{ errMsg }}</p>
      </form>
      <div class="popup_footer">
        <button @click.prevent="!loginMode ? signup() : signin()">
          {{ !loginMode ? "Register" : "Login" }}
        </button>
        <p>
          {{ loginMode ? "Not registered yet? " : "Already have an account? " }}
          <a @click.prevent="switchModes()">{{
            !loginMode ? "Login" : "Register"
          }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
export default {
  props: {
    closePopUp: Function,
  },
  data() {
    return {
      formInputs: [
        {
          label: "First name",
          type: "text",
          placeholder: "Joe",
          mode: false,
          name: "firstName",
        },
        {
          label: "Last name",
          type: "text",
          placeholder: "Doe",
          mode: false,
          name: "lastName",
        },
        {
          label: "Email",
          type: "email",
          placeholder: "example@sample.com",
          mode: true,
          name: "email",
        },
        {
          label: "Password",
          type: "password",
          placeholder: "********",
          mode: true,
          name: "password",
        },
        {
          label: "Password Confirmation",
          type: "password",
          placeholder: "",
          mode: false,
          name: "passwordConfirmation",
        },
      ],
      user: {
        firstName: "",
        lastName: "",
        passwordConfirmation: "",
        email: "",
        password: "",
      },
      loginMode: true,
      errMsg: "",
    };
  },
  methods: {
    switchModes() {
      this.loginMode = !this.loginMode;
    },
    signin() {
      signInWithEmailAndPassword(getAuth(), this.user.email, this.user.password)
        .then((data) => {
          this.closePopUp();
          console.log(data);
          this.$router.push("/");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              this.errMsg = "Invalid email";
              break;
            case "auth/wrong-password":
              this.errMsg = "Invalid password";
              break;
            case "auth/user-not-found":
              this.errMsg = "User not found";
              break;
            default:
              this.errMsg = "Email or password was incorrect";
              break;
          }
        });
    },
    signup() {
      createUserWithEmailAndPassword(
        getAuth(),
        this.user.email,
        this.user.password
      )
        .then(() => {
          this.closePopUp();
          console.log("Vous êtes enregistrer avec succès");
        })
        .catch((error) => {
          console.log(error);
          switch (error.code) {
            case "auth/weak-password":
              this.errMsg = "Password should be at least 6 characters";
              break;
            case "auth/email-already-in-use":
              this.errMsg = "Email already exists";
              break;
            default:
              this.errMsg = "Email or password was incorrect";
              break;
          }
        });
        this.addUser(this.user)
    },
    addUser(user) {
      try {
        firestore.collection("Users").doc().set(user);
        console.log({
          success: true,
          message: "Utilisateur ajouter avec succès",
        });
      } catch (err) {
        console.log(err.message)
        console.log("ERREUR ADD USER");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div.popup {
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  div.popup_overlay {
    background-color: rbga(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
  div.popup_body {
    background-color: #222;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 0.6rem;
    width: 25vw;
    z-index: 2;
    div.popup_header {
      margin-bottom: 0.5rem;
      h1 {
        font-size: 16px;
        text-align: center;
        font-weight: 600;
        color: #888;
      }
      h3 {
        font-size: 23px;
        text-align: center;
        font-weight: 500;
        color: #eee;
      }
    }

    form {
      display: flex;
      flex-direction: column;

      div.form-element {
        display: flex;
        flex-direction: column;
        margin-bottom: 0.6rem;

        label {
          color: white;
          margin-bottom: 0.3rem;
        }

        input {
          color: white;
          border: 2px #888 groove;
          border-radius: 0.2rem;
          padding: 0.4rem;
        }
      }
    }

    div.popup_footer {
      padding: 0.7rem;
      padding-top: 0;
      p {
        color: white;
        text-align: center;
        margin-bottom: 0.3rem;

        a {
          color: #0275d8;
          cursor: pointer;
          transition: color 0.1s ease-in;
          &:hover {
            color: #5bc0de;
          }
        }
      }

      button {
        background-color: #0275d8;
        color: white;
        text-decoration: none;
        padding: 0.4rem 0.8rem;
        width: 100%;
        margin-bottom: 0.4rem;
        transition: background-color 0.1s ease-in;
        text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
        &:hover {
          background-color: #2185a3;
        }
      }
    }
  }
}
</style>
