<template>
  <div class="body">
    <div class="card">
      <div>
        <img class="logo" src="../assets/icon-above-font.jpg" alt="Logo de la société Groupomania" />
      </div>
      <h1 class="title">Votre réseau social d'entreprise!</h1>
      <p class="subtitle">Pas encore de compte? <router-link class="signup" to="/signup"><strong>S'enregistrer</strong></router-link></p>
      <form id="submit" method="post">
        <label for="email"><strong>Email:</strong></label>
        <input id="email" v-model="email" type="text" aria-label="Email de connexion" required />
        <div class="error">
          <p class="error-message" v-if="!emailError">{{ messageId }}</p>
        </div>
        <label for="password"><strong>Mot de passe:</strong></label>
        <input id="password" v-model="password" type="password" maxlength="50" aria-label="Mot de passe de connexion" pattern="[A-Za-z0-9]$" required />
        <div class="error">
          <p class="error-message" v-if="!passwordError">{{ messagePass }}</p>
        </div>
      </form>
      <p class="error-message" v-if="!idError">{{ message }}</p>
      <button class="login-btn" @click="login()" aria-label="Se connecter"><strong>Se connecter</strong></button>
    </div>
  </div>
</template>

<script>
import instance from '../axios';

export default {
  name: "Login",
  data: function () {
    return {
      email: '',
      password: '',
      message: '',
      idError: false,
      emailError: false,
      passwordError: false,
      messageId: '',
      messagePass: '',
      emailRegex: /^[a-z0-9._-]+@[a-z0-9.-]{2,10}[.][a-z]{2,4}$/,
      passwordRegex: /^[a-zA-Z0-9]{6,50}$/
    };
  },
  methods: {
    // Fonction de Login
    login: function () {
      this.emailError = this.emailRegex.test(this.email)
      this.passwordError = this.passwordRegex.test(this.password)
      let user = {
        email: this.email,
        password: this.password,
      };
      if (this.emailError === false) {
        this.messageId = this.email.length === 0 ? 'Veuillez remplir ce champ' : 'Email non valide'
      } 
      if (this.passwordError === false) {
        this.messagePass = this.password.length === 0 ? 'Veuillez remplir ce champ' : 'Mot de passe incorrect'
      }
      if (this.passwordError &&  this.emailError) {
        instance.post('http://localhost:3000/api/auth/login', user)
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.$router.push('/posts')
        })
        .catch(() => {
          this.message = 'Vos identifiants sont incorrects'
          this.idError = true
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
    rgb(235, 156, 103) 0%, 
    rgb(221, 87, 24) 25%, 
    rgb(245, 165, 111) 51%, 
    rgb(177, 51, 12) 100%
  );  
  animation: AnimateBG 20s ease infinite;
}

@keyframes AnimateBG { 
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}

.card {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  height: auto;
  width: 540px;
  padding: 32px;
  background: rgb(247, 238, 232);
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

.subtitle {
  margin: 13px;
  font-size: 15px;
}

.error-message {
  margin-bottom: 18px;
  font-size: 13px;
  color: red;
}

.signup {
  margin-left: 5px;
  color: #A22D16;
}

.login-btn {
  width: 100%;
  padding: 16px;
  margin-top: 15px;
  font-size: 17px;
  border: none;
  border-radius: 30px;
  color: #fff;
  background-color: #A22D16;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.login-btn:hover {
  transform: scale(1);
  cursor: pointer;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}

/* MEDIA QUERIES */
@media screen and (min-width: 769px) and (max-width: 992px) {
  .card {
    width: 93%;
  }
}

@media screen and (min-width: 300px) and (max-width: 768px) {
  .card {
    width: 97%;
  }
}
</style>
