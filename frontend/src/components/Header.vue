<template>
  <div class="body">
    <div class="card">
      <div class="card__container">
        <img class="card__container--logo" src="../assets/icon-left-font.png" />
      </div>
      <div class="card__links">
        <router-link class="card__link" to="/posts"
          ><strong>Publications</strong></router-link
        >
        |
        <router-link class="card__link" to="/profile"
          ><strong>Profil</strong></router-link
        >
        |
        <router-link class="card__link" to="/" @click="logout()"
          ><strong>Déconnexion</strong></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import user from '../user';
export default {
  name: 'Header',
  data: function () {
    return {
      mode: 'header',
      component: {},
    };
  },
  methods: {
    logout: function () {
      localStorage.clear(user);
      this.$router.go();
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  padding: 10px 45px;
  background: white;
  box-shadow: 0 2px 4px rgb(0 0 0 / 6%), 0 8px 16px rgb(0 0 0 / 3%);
}

.card__container {
  width: 83%;
}

.card__links {
  width: 21%;
  display: flex;
  justify-content: space-between;
}

.card__link {
  text-decoration: none;
  color: #1976d2;
}
.card__title {
  width: 100%;
  margin: 6px 0 6px 0;
  text-align: center;
  font-size: 13px;
}

.card__signin {
  width: 100%;
  font-size: 17px;
  text-decoration: none;
  color: #1976d2;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
}

.card__signin:hover {
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

.card__container--logo {
  height: 50px;
}

/* MEDIA QUERIES */
@media screen and (min-width: 1201px) and (max-width: 1500px) {
}

@media screen and (min-width: 993px) and (max-width: 1200px) {
}

@media screen and (min-width: 769px) and (max-width: 992px) {
}

@media screen and (min-width: 481px) and (max-width: 768px) {
}
</style>
