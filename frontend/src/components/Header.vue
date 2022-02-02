<template>
  <div>
    <div class="header">
      <div class="header-container">
        <router-link
          class="header-link"
          to="/posts"
          aria-label="Lien vers les publications"
          role="link">
            <img
              class="logo"
              src="../assets/icon-left-font.png"
              alt="Logo de la société Groupomania">
        </router-link> 
      </div>
      <router-link to="/profile" 
        class="profile-link"
        role="link"
        aria-label="Lien vers le profil">
        <div class="card-user">
          <img
            class="profile-picture"
            v-if="this.userInfo.imageUrl"
            :src="this.userInfo.imageUrl"
            alt="Photo de profil de l'utilisateur connecté">
          <img
            class="profile-picture"
            v-else src="../assets/img-user-default.jpg"
            alt="Photo de profil par défaut">
          <p>
            {{ userInfo.firstname }}
          </p>
          <font-awesome-icon icon="check-square" />
        </div>
      </router-link>
      <div class="header-links">
        <router-link
          class="header-link"
          to="/posts"
          aria-label="Lien vers les publications"
          role="link">
            <font-awesome-icon icon="comment" />
        </router-link>
        |
        <router-link
          class="header-link"
          to="/profile"
          aria-label="Lien vers le profil"
          role="link">
          <font-awesome-icon icon="user" />
        </router-link>
        |
        <span
          class="header-link"
          @click="logout()"
          aria-label="Lien vers la déconnexion"
          role="link">
          <font-awesome-icon icon="arrow-alt-circle-right" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '../axios'

export default {
  name: 'Header',
  data: function () {
    return {
      userInfo: {},
      account: null,
    }
  },
  mounted() {
    // Récupération du user courant
     this.account = JSON.parse(localStorage.getItem('user'))
    if (this.account.userId) {
      instance.get(`http://localhost:3000/api/auth/${this.account.userId}`, {
          headers: { Authorization: 'Bearer ' + this.account.token },
      })
      .then((res) => {
        this.userInfo = res.data
        this.isAdmin = this.account.isAdmin
      })
      .catch((err) => {
        console.log(err)
      });
    }
  },
  methods: {
    // Déconnexion
    logout: function () {
      localStorage.clear()
      this.$router.push('/')
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 10px 45px;
  background: #fff;
  box-shadow: 0 2px 6px rgb(0 0 0 / 6%), 0 8px 16px rgb(0 0 0 / 3%);
}

.header-container {
  width: 83%;
}

.logo {
  height: 50px;
}

.profile-link {
  text-decoration: none;
}

.card-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 130px;
  margin-right: 90px;
  padding: 3px;
  border-radius: 25px;
  background-color: #ebeae9;
  transform: scale(1);
  transition-property: transform;
  transition-duration: 0.4s;
  cursor: pointer;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.card-user:hover {
  transform: scale(1.1);
}

.profile-picture {
  width: 33px;
  height: 33px;
  border-radius: 17px;
}

.card-user svg {
  margin-right: 5px;
  font-size: 18px;
  color: #148000;  
}

.header-links {
  display: flex;
  justify-content: space-between;
  width: 24%;
}

.header-link {
  text-decoration: none;
  font-size: 25px;
  color: #e56114;
  transform: scale(1);
  transition-property: transform;
  transition-duration: 0.4s;
}

.header-link:hover {
  transform: scale(1.2);
  cursor: pointer;
}

/* MEDIA QUERIES */
@media screen and (min-width: 769px) and (max-width: 992px) {
  .header-links {
    width: 37%;
  }
}

@media screen and (min-width: 501px) and (max-width: 768px) {
  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }

  .card-user {
    width: 108px;
    padding: 3px;
    margin-right: 40px;
  }

  .card-user p {
    font-size: 14px;
  }

  .profile-picture {
    width: 27px;
    height: 27px;
    border-radius: 20px;
  }

  .header-links {
    width: 40%;
  }

  .header-link {
    font-size: 20px;
  }

  .logo {
    height: 36px;
  }
}

@media screen and (min-width: 300px) and (max-width: 500px) {
  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }

  .card-user {
   display: none;
  }

  .header-links {
    width: 42%;
  }

  .header-link {
    font-size: 20px;
  }

  .logo {
    height: 35px;
  }
}
</style>
