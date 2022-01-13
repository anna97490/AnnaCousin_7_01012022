<template>
  <div class="card">
    <div class="card__container">
      <img class="logo" src="../assets/icon-above-font.png">
    </div>
    <h1 class="card__title" v-if="mode == 'signup'">Votre réseau social d'entreprise!</h1>
    <router-link class="card__signup" to="/" width="100%"><strong>Se connecter</strong></router-link>
    <form>
      <div class="card__form">
        <input class="card__form--input1" type="email" v-model="email" placeholder="Email" required aria-label="Email de connection">
        <div class="card__form--name">
          <input  class="card__form--input2"  type="firstname" v-model="firstname" placeholder="Prénom" required aria-label="Prénom pour la connection">
          <input  class="card__form--input2"  type="lastname" v-model="lastname" placeholder="Nom" required aria-label="Nom pour la connection">
        </div>
        <input  class="card__form--input1" type="password" v-model="password" placeholder="Password" required aria-label="Mot de passe de connection"> 
      </div>
    </form>
    <button class="card__btn" @click="signup()" type="submit" aria-label="Se connecter"><strong>Se connecter</strong></button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Signup',
  data: function () {
    return {
      mode: 'signup',
      email: '',
      firstname: '',
      lastname: '',
      password: ''
    }
  },
  methods: {
    signup: function () {
      let newUser = {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password
      }
      axios.post("http://localhost:3000/api/users/signup", newUser)
      .then((res) => {
        if (res.status === 201) {
          localStorage.setItem("signed", JSON.stringify(res.data));
          this.$router.push("/");
        }
      })
      .catch((err) => {
        localStorage.clear();
        if (err.response.status === 401) {
          this.error = "Identifiants incorrects!";
        } else {
          this.error = "Problème serveur!";
        }
      })
    },
  }
}
</script>

<style>
.card {
  height: 575px;
  width: 540px;
  padding: 32px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  background:white;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.card__form {
  width: 100%;
}

.card__form--name {
  display: flex;
  margin: 16px 0px;
  gap:16px;
  flex-wrap: wrap
}

.card__form--input2  {
  padding: 12px;
  border: none;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

form {
  width: 100%;
}

.card__form--input1 {
  width: 100%;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.card__title {
  width: 100%;
  margin-bottom: 5px;
  text-align: center;
  font-size: 13px;
}

.card__signup {
  margin: 2% 25%;
  text-align: center;
  font-weight: 500;
  color: #1976D2;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
}

.card__signup:hover {
  color: #4A90FF;
  transform: scale(1);
  cursor: pointer;
}

.card__btn {
  width: 100%;
  padding: 16px;
  margin-top: 25px;
  font-size: 17px;
  border: none;
  border-radius: 8px;
  color:white;
  background-color: #FF5533;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.card__btn:hover {
  transform: scale(1);
  cursor: pointer;
  background-color: #1976D2;
}

.logo-container {
    display: flex;
    justify-content: center;
}

.logo {
    height: 130px;
}

form input {
  padding: 12px;
  margin: 3px 0 3px 0;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  flex:1;
  min-width: 100px;
  color: black;
  background:#f2f2f2;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

/* MEDIA QUERIES */
@media screen and (min-width: 1201px) and (max-width: 1500px) {

}

@media screen and (min-width: 993px) and (max-width: 1200px) {

}

@media screen and (min-width: 769px) and (max-width: 992px) {

}

@media screen and (min-width: 481px) and (max-width: 768px) {}


</style>
