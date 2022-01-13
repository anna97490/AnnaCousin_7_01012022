<template>
  <div class="card">
    <div class="card__container">
      <img class="logo" src="../assets/icon-above-font.png">
    </div>
    <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
    <h1 class="card__title" v-else>Inscription</h1>
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
    <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
      Adresse mail déjà utilisée
    </div>
    <div class="form-row">
      <button @click="login()" class="button" v-if="mode == 'login'">
        <span>Connexion</span>
      </button>
      <button @click="createAccount()" class="button" v-else>
        <span>Créer mon compte</span>
      </button>
    </div>
    
   
  </div>
</template>

<script>

export default {
   name: 'Login',
  data: function () {
    return {
      mode: 'login',
      email: '',
      prenom: '',
      nom: '',
      password: '',
    }
  },
  methods: {
    login: function () {
      const self = this;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      }).then(function () {
        self.$router.push('/post');
      }, function (error) {
        console.log(error);
      })
    },
  }
}
</script>
