<template>
  <div class="body">
    <div class="card">
      <div class="card__container">
        <img class="logo" src="../assets/icon-above-font.png" />
      </div>
      <h1 class="card__title" v-if="mode == 'login'">
        Votre réseau social d'entreprise!
      </h1>
      <router-link class="card__signup" to="/signup"
        ><strong>S'enregistrer</strong></router-link
      >
      <router-link class="card__signup" to="/profile" width="100%"
        ><strong>Profile</strong></router-link
      >
      <form>
        <div class="card__form">
          <input
            v-model="email"
            type="text"
            placeholder="Email"
            required
            aria-label="Email de connection"
          />
          <!--<label for="email-adress">Mot de passe</label>-->
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            aria-label="Mot de passe de connection"
          />
        </div>
      </form>
      <button
        class="card__btn"
        @click="login()"
        type="submit"
        aria-label="Se connecter"
      >
        <strong>Se connecter</strong>
      </button>
    </div>
  </div>
</template>

<script>
//import user from '../user'
import instance from '../axios';

export default {
  name: 'Login',
  data: function () {
    return {
      mode: 'login',
      email: '',
      password: '',
      //implémenter les regexp
    };
  },

  /*created() {
    this.userLogCheck()
  },*/

  methods: {
    login: function () {
      let user = {
        email: this.email,
        password: this.password,
      };
      instance
        .post('http://localhost:3000/api/auth/login', user)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data));
            this.$router.push('/posts');
          }
        })
        .catch((res) => {
          if (res.response.status == 401) {
            this.message = "Cet utilisateur n'existe pas !";
          } else if (res.response.status == 500) {
            this.message = 'Erreur serveur!';
          }
        });
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
  height: auto;
  width: 540px;
  padding: 32px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.card__form {
  width: 100%;
}

form {
  width: 100%;
}

.card__form input {
  width: 100%;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.card__title {
  width: 100%;
  margin: 6px 0 6px 0;
  text-align: center;
  font-size: 13px;
}

.card__signup {
  width: 100%;
  margin: 2% 41%;
  font-size: 17px;
  color: #1976d2;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
}

.card__signup:hover {
  color: #4a90ff;
  transform: scale(1);
  cursor: pointer;
}

.card__btn {
  width: 100%;
  padding: 16px;
  margin-top: 15px;
  font-size: 17px;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: #ff5533;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.card__btn:hover {
  transform: scale(1);
  cursor: pointer;
  background-color: #1976d2;
}

.logo-container {
  display: flex;
  justify-content: center;
}

.logo {
  height: 130px;
}

form input {
  width: 100%;
  padding: 12px;
  margin: 12px 0 12px 0;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
  background: #f2f2f2;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
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
