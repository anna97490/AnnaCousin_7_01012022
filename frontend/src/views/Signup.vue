<template>
  <div class="body">
    <div class="card">
      <div>
        <img
          class="logo"
          src="../assets/icon-above-font.jpg"
          alt="Logo de la société Groupomania">
      </div>
      <h1 class="title">Votre réseau social d'entreprise!</h1>
      <router-link class="login" to="/" aria-label="Lien vers la connexion">
        <strong>Se connecter</strong>
      </router-link>
      <form id="submit" method="post">
        <div>
          <label for="email">
            <strong>Email:</strong>
          </label>
          <input
            id="email"
            type="email"
            v-model="email"
            aria-label="Email pour l'inscription"
            maxlength="255"
            required>
          <div class="error">
            <p class="error-message" v-if="!emailError">
              {{ messageId }}
            </p>
          </div>
          <div class="name-container">
            <label for="lastname">
              <strong>Nom:</strong>
            </label>
            <input
              id="lastname"
              type="lastname"
              v-model="lastname"
              aria-label="Nom pour l'inscription"
              required>
            <div class="error">
              <p class="error-message" v-if="!lastnameError">
                {{ messageLastname }}
              </p>
            </div>
            <label for="firstname">
              <strong>Prénom:</strong>
            </label>
            <input
              id="firstname"
              type="firstname"
              v-model="firstname"
              aria-label="Prénom pour l'inscription"
              required>
            <div class="error">
              <p class="error-message" v-if="!firstnameError">
                {{ messageFirstname }}
              </p>
            </div>
          </div>
          <label for="password">
            <strong>Mot de passe:</strong>
          </label>
          <input
            id="password"
            type="password"
            maxlength="50"
            v-model="password"
            aria-label="Mot de passe pour l'inscription"
            required>
          <div class="error">
            <p class="error-message" v-if="!passwordError">
              {{ messagePass }}
            </p>
          </div>
        </div>
      </form>
      <p class="error-message" v-if="!idError">
        {{ message }}
      </p>
      <button class="signup-btn" @click="signup()" aria-label="S'inscrire">
        <strong>S'inscrire</strong>
      </button>
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
      idError: false,
      emailError: false,
      firstnameError: false,
      lastnameError: false,
      passwordError: false,
      message: '',
      messageFirstname: '',
      messageLastname: '',
      messageId: '',
      messagePass: '',
      account: '',
      nameRegex: /^[A-Za-z-éèç ]+$/,
      emailRegex: /^[A-Za-z0-9._+-]{2,40}@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      passwordRegex: /^[A-Za-z0-9]{6,50}$/
    };
  },
  methods: {
    // Fonction de Signup
    signup: function () {
      // Tests des champs du formulaire
      this.firstnameError = this.nameRegex.test(this.firstname);
      this.lastnameError = this.nameRegex.test(this.lastname);
      this.emailError = this.emailRegex.test(this.email);
      this.passwordError = this.passwordRegex.test(this.password);
      let user = {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
        imageUrl: this.imageUrl
      }
      // Les différents cas d'erreurs de saisie
      if (this.firstnameError === false) {
        this.messageFirstname =
          this.firstname.length === 0
            ? 'Veuillez remplir ce champ'
            : `Veuillez n'utiliser que des lettres`;
      }
      if (this.lastnameError === false) {
        this.messageLastname =
          this.lastname.length === 0
            ? 'Veuillez remplir ce champ'
            : `Veuillez n'utiliser que des lettres`;
      }
      if (this.emailError === false) {
        this.messageId =
          this.email.length === 0
            ? 'Veuillez remplir ce champ'
            : 'Email non valide';
      }
      if (this.passwordError === false) {
        this.messagePass =
          this.password.length === 0
            ? 'Veuillez remplir ce champ'
            : 'Mot de passe incorrect';
      }
      if (
        this.passwordError &&
        this.emailError &&
        this.firstnameError &&
        this.lastnameError
        ) {
        instance.post('http://localhost:3000/api/auth/signup', user)
        .then(() => {
          delete user['firstname'];
          delete user['lastname'];
          setTimeout(instance.post('http://localhost:3000/api/auth/login', user)
          .then((res) => {
              localStorage.setItem('user', JSON.stringify(res.data));
              this.$router.push('/posts');
            }), 2000);
        })
        .catch(() => {
          this.message = 'Vos saisies sont incorrectes';
          this.idError = true;
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
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(
    -45deg,
    rgb(18 38 139) 0%, 
    rgb(97 141 241) 25%, 
    rgb(169 206 235) 51%, 
    rgb(23 46 131) 100% 
  )
}

.card {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  height: auto;
  width: 540px;
  padding: 32px;
  background-color: #e9edf1;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.logo {
  width: 200px;
}

.title {
  width: 100%;
  margin: 6px 0 6px 0;
  text-align: center;
  font-size: 15px;
}

.error-message {
  margin-bottom: 18px;
  font-size: 13px;
  color: red;
}

.login {
  margin: 13px;
  margin-left: 5px;
  color: #a22d16;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
}

.login:hover {
  transform: scale(1);
  cursor: pointer;
}

form {
  width: 100%;
}

input {
  width: 100%;
  padding: 12px;
  margin: 5px 0 10px 0;
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
  border-radius: 30px;
  color: #fff;
  background: linear-gradient(#f99655, #bd3007);
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
