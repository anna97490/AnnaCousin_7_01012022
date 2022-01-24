<template>
  <div class="body">
    <div class="card">
      <div>
        <img class="logo" src="../assets/icon-above-font.png" alt="Logo de la société Groupomania" />
      </div>
      <h1 class="title">Votre réseau social d'entreprise!</h1>
      <p class="subtitle">Pas encore de compte? <router-link class="signup" to="/signup"><strong>S'enregistrer</strong></router-link></p>
      <form>
        <label for="email"><strong>Email:</strong></label>
        <input id="email" v-model="email" type="text" aria-label="Email de connexion" maxlength="255" pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$" required />
        <div class="error">
          <p class="error-message" v-if="this.email == false">{{ message }}</p>
        </div>
        <label for="password"><strong>Mot de passe:</strong></label>
        <input id="password" v-model="password" type="password" maxlength="50" aria-label="Mot de passe de connexion" pattern="[A-Za-z0-9]$" required />
        <div class="error">
          <p class="error-message" v-if="this.password == false">{{ message }}</p>
        </div>
      </form>
      <p class="error-message" v-if="this.email == '' || this.password == ''">{{ message }}</p>
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
      emailRegex: /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,4}$/,
      passwordRegex: /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50})$/
    };
  },
  computed: {
    validation: function () {
      if (this.email != "" && this.password != "") {
          return true
      } else {
          return false
      }  
    }
  },
  methods: {
    // Fonction de Login
    login: function () {
      let emailTest = this.emailRegex.test(this.email)
      let passwordTest = this.passwordRegex.test(this.password)
      let user = {
        email: this.email,
        password: this.password,
      };
      if (emailTest == false || this.email == false) {
        this.message = 'Email non valide'
      } else if (passwordTest == false || this.password == false) {
        this.message = 'Mot de passe non valide'
      } else {
        instance.post('http://localhost:3000/api/auth/login', user)
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.$router.push('/posts')
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
  background: white;
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

.subtitle {
  margin: 13px;
  font-size: 15px;
}

.error-message {
  margin-bottom: 18px;
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
  border-radius: 8px;
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
