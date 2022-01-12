<template>
  <div class="card">
    <div class="logo-container">
      <img class="logo" src="../assets/icon-above-font.png">
    </div>
    <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
    <h1 class="card__title" v-else >Inscription</h1>
    <p class="card__subtitle" v-if="mode == 'login'"><span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
    <p class="card__subtitle" v-else><span class="card__action" @click="switchToLogin()">Se connecter</span></p>
    <div class="form-row">
      <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail"/>
    </div>
    <div class="form-row" v-if="mode == 'create'">
      <input v-model="firstname" class="form-row__input" type="text" placeholder="Prénom"/>
      <input v-model="lastname" class="form-row__input" type="text" placeholder="Nom"/>
    </div>
    <div class="form-row">
      <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe"/>
    </div>
    <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
      Adresse mail déjà utilisée
    </div>
    <div class="form-row">
      <button @click="login()" class="button" :class="{'button--disabled' : !validationFields}" v-if="mode == 'login'">
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button @click="createAccount()" class="button" :class="{'button--disabled' : !validationFields}" v-else>
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div>
  </div>
</template>

import { mapState } from 'vuex'
import instance from '../axios'

<script>
export default {
  name: 'Home',
  data: function () {
    return {
      mode: 'login',
      email: '',
      firstname: '',
      lastname: '',
      password: '',
    }
  },

  // Validation des champs
  computed: {
    validationFields: function () {
      if (this.mode == 'create') {
        if (this.email != '' && this.firstname != '' && this.lastname != '' && this.password != '') {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != '' && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    }  
  },

  methods: {
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },
    createAccount: function() {
      this.$store.dispatch('createAccount', {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password
      })
    }
  }
}
</script>

// STYLES
<style scoped src="./Home.css">

</style>
