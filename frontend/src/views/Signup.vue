<template>
  <div class="body">
    <div class="card">
      <div>
        <img class="logo" src="../assets/icon-above-font.png" alt="Logo de la société Groupomania" />
      </div>
      <h1 class="title">Votre réseau social d'entreprise!</h1>
      <router-link class="login" to="/" aria-label="Lien vers la connexion"><strong>Se connecter</strong></router-link>
      <form>
        <div>
          <label for="email"><strong>Email:</strong></label>
          <input id="email" type="email" v-model="email" aria-label="Email pour l'inscription" maxlength="255" pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$" required/>
          <div class="error">
            <p class="error-message" v-if="this.email == false">{{ message }}</p>
          </div>
          <div class="name-container">
            <label for="lastname"><strong>Nom:</strong></label>
            <input id="lastname" type="lastname" v-model="lastname" aria-label="Nom pour l'inscription" maxlength="255" pattern="[A-Za-z0-9._+-]$" required />
            <div class="error">
              <p class="error-message"  v-if="this.lastname == false">{{ message }}</p>
            </div>
            <label for="firstname"><strong>Prénom:</strong></label>
            <input id="firstname" type="firstname" v-model="firstname" aria-label="Prénom pour l'inscription" pattern="[A-Za-z0-9._+-]$" required />
            <div class="error">
              <p class="error-message"  v-if="this.firstname == false">{{ message }}</p>
            </div>
          </div>
          <label for="password"><strong>Mot de passe:</strong></label>
          <input id="password" type="password" v-model="password" aria-label="Mot de passe pour l'inscription" pattern="[A-Za-z0-9._+-]$" required />
          <div class="error">
              <p class="error-message" v-if="this.password == false">{{ message }}</p>
            </div>
        </div>
      </form>
      <button class="signup-btn" @click="signup()" aria-label="S'inscrire"><strong>Se connecter</strong></button>
    </div>
  </div>
</template>

<script>
import instance from '../axios';

export default {
  name: 'Signup',
  data: function () {
    return {
      email: '',
      lastname: '',
      firstname: '',
      password: '',
      imageUrl: '',
      message: '',
      nameRegex: /^[A-Za-z0-9._+-]+$/,
      emailRegex: /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      passwordRegex: /^[A-Za-z0-9]{6,50}$/
    };
  },
  computed: {
    validation: function () {
      if (this.email != "" && this.password != "" && this.firstname != "" && this.lastname != "") {
          return true
      } else {
          return false
      }  
    }
  },
  methods: {
    // Fonction de Signup
    signup: function () {
      let nameTest = this.nameRegex.test(this.firstname && this.lastname)
      let emailTest = this.emailRegex.test(this.email)
      let passwordTest = this.passwordRegex.test(this.password)
      let user = {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
        imageUrl: this.imageUrl
      };
      if (emailTest == false || this.email == false) {
        this.message = 'Email non valide'
      } else if (passwordTest == false || this.password == false) {
        this.message = 'Mot de passe non valide'
      } else if (nameTest == false || this.firstname == false || this.lastname == false) {
        this.message = 'Veuillez taper uniquement des lettres'
      } else  {
        instance.post('http://localhost:3000/api/auth/signup', user)
        .then(() => {
          alert('Votre compte a bien été créé, veuillez vous connecter')
          this.$router.push('/')
        })
        .catch((err) => {
          alert(err)
        });
      }
    },
  },
};
</script>

<style scoped>
.body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

.card {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  height: auto;
  width: 540px;
  padding: 32px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.logo {
  height: 130px;
}

.title {
  width: 100%;
  margin: 6px 0 6px 0;
  text-align: center;
  font-size: 15px;
}

.login {
  margin: 13px;
  margin-left: 5px;
  font-size: 15px;
  color: #A22D16;
}

form {
  width: 100%;
}

input {
  width: 100%;
  padding: 12px;
  margin: 5px 0 18px 0;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
  background-color: #f2f2f2;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.signup-btn {
  width: 100%;
  padding: 16px;
  margin-top: 25px;
  font-size: 17px;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: #A22D16;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.signup-btn:hover {
  transform: scale(1);
  cursor: pointer;
}

/* MEDIA QUERIES */
@media screen and (min-width: 769px) and (max-width: 992px) {
  .card {
    width: 93%;
  }
}

@media screen and (min-width: 300px) and (max-width: 768px) {
  .card {
    width: 98%;
  }
}
</style>
