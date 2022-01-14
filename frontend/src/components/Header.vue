<template>
  <div class="body" >
    <div class="card" >
      <div class="card__container">
        <img class="card__container--logo" src="../assets/icon-left-font.png">
      </div>
      <div class="card__links">
        <router-link class="card__link" to="/posts"  @click="home"><strong>Publications</strong></router-link> |
        <router-link class="card__link" to="/profile"  @click="profile"><strong>Profile</strong></router-link> 
      </div> 
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Posts',
  data: function () {
    return {
      mode: 'posts',
      email: '',
      password: '',
    }
  },
  methods: {
    login: function () {
      let newUser = {
        email: this.email,
        password: this.password
      }
      axios.post("http://localhost:3000/api/users/login", newUser)
      .then((res) => {
        if (res.status === 201) {
          localStorage.setItem("logged", JSON.stringify(res.data));
          this.$router.push("/");
        }
      })
      .catch((err) => {
        localStorage.clear();
        if (err.response.status === 401) {
          this.error = "Connexion au serveur impossible.";
        } else {
          this.error = "Vérifiez vos identifiants. ";
        }
      })
    },
  }
}
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  padding: 10px 45px;
  background:white;
  box-shadow: 0 2px 4px rgb(0 0 0 / 6%), 0 8px 16px rgb(0 0 0 / 3%);
}

.card__container {
  width: 90%;
}

.card__links {
  width: 12%;
  display: flex;
  justify-content: space-between;
}

.card__link {
  text-decoration: none;
   color: #1976D2;
}
.card__title {
  width: 100%;
  margin: 6px 0 6px 0;
  text-align: center;
  font-size: 13px;
}

.card__signup {
  width: 100%;
  font-size: 17px;
  text-decoration: none;
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
  margin-top: 15px;
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

@media screen and (min-width: 481px) and (max-width: 768px) {}


</style>