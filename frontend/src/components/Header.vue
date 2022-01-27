<template>
  <div>
    <div class="header">
      <div class="header-container">
        <img class="logo" src="../assets/icon-left-font.png" alt="Logo de la société Groupomania" />
      </div>
      <div class="header-links">
        <router-link class="header-link" to="/posts" aria-label="Lien vers les publications" role="link"><font-awesome-icon icon="comment" /></router-link> |
        <router-link class="header-link" to="/profile" aria-label="Lien vers le profil" role="link"><font-awesome-icon icon="user" /></router-link> |
        <span class="header-link" @click="logout()" aria-label="Lien vers la déconnexion" role="link"><font-awesome-icon icon="arrow-alt-circle-right" /></span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Header',
  data: function () {
    return {
      component: {},
    };
  },
  methods: {
    logout: function () {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 10px 45px;
  background: white;
  box-shadow: 0 2px 6px rgb(0 0 0 / 6%), 0 8px 16px rgb(0 0 0 / 3%);
}

.header-container {
  width: 83%;
}

.logo {
  height: 50px;
}

.header-links {
  display: flex;
  justify-content: space-between;
  width: 21%;
}

.header-link {
  text-decoration: none;
  font-size: 25px;
  color: #A22D16;
  transform: scale(1);
  transition-property: transform;
  transition-duration: 0.4s;
}

.header-link:hover {
  transform: scale(1.2);
  cursor: pointer;
}

/* MEDIA QUERIES */
@media screen and (min-width: 300px) and (max-width: 768px) {
  .header {
    padding: 10px;
  }
  .header-links {
    width: 40%;
  }
 .logo {
   height: 40px;
 }
}
</style>
