<template>
  <div class="card-container">
    <h1 class="title">Découvrez toutes les publications:</h1>
    <div
      class="card"
      :key="index"
      v-for="(post, index) in allPosts"
      data-aos="fade-right"
      data-aos-easing="linear"
      data-aos-duration="700"
    >
      <div>
        <p class="user-infos">
          <img
            class="profile-picture"
            v-if="userInfo.imageUrl"
            :src="userInfo.imageUrl"
            alt="Photo de profil de l'auteur de la publication"
          />
          <img
            class="profile-picture"
            v-else
            src="../assets/img-user-default.jpg"
          />
          <span class="name"
            ><strong>Publié par :</strong> {{ post.authorFullName }}</span
          >
          <span
            class="delete-btn profile"
            v-if="isAdmin == true"
            @click="getOneUser(post)"
            ><font-awesome-icon icon="user"
          /></span>
        </p>
        <p class="date">
          le {{ dateTime(post.createdAt) }} à {{ hour(post.createdAt) }}
        </p>
        <div class="image-container" v-if="post.imageUrl">
          <img
            v-if="post.imageUrl"
            class="image"
            :src="post.imageUrl"
            alt="Image postée"
          />
        </div>
        <div class="image-container1" v-if="post.imageUrl == null"></div>
        <p class="text">{{ post.text }}</p>
        <div class="btn-container">
          <modale
            :dataPost="currentPost"
            v-bind:toggleModale="displayModale"
            v-on:closeModal="receiveStateFromChild"
          ></modale>
          <span
            v-if="post.userId == user.userId || isAdmin == true"
            @click="toggleModale(post)"
            class="update-btn"
            ><font-awesome-icon icon="edit"
          /></span>
          <span
            v-if="post.userId == user.userId || isAdmin == true"
            @click="deletePost(post)"
            class="delete-btn"
            ><font-awesome-icon icon="trash"
          /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import instance from '../axios';
import Modale from '../components/Modale.vue';

export default {
  name: 'Post',
  components: {
    modale: Modale,
  },
  data() {
    return {
      allPosts: [],
      user: JSON.parse(localStorage.getItem('user')),
      post: {},
      userId: this.userId,
      isAdmin: this.isAdmin,
      account: null,
      userInfo: {},
      displayModale: false,
      currentPost: {},
    };
  },
  created() {
    this.getProfile();
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    instance
      .get(`http://localhost:3000/api/posts`, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
      .then((res) => {
        for (const post of res.data) {
          this.allPosts.push(post);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getProfile: function () {
      this.account = JSON.parse(localStorage.getItem('user'));
      if (this.account?.userId) {
        instance
          .get(`http://localhost:3000/api/auth/${this.account.userId}`, {
            headers: { Authorization: 'Bearer ' + this.account.token },
          })
          .then((res) => {
            this.userInfo = res.data;
            this.isAdmin = this.account.isAdmin;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // Récupération du user pour rediriger l'admin sur son profil
    getOneUser: function (post) {
      const user = JSON.parse(localStorage.getItem('user'));
      let id = post.userId;
      instance
        .get(`http://localhost:3000/api/auth/${id}`, {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        })
        .then((res) => {
          console.log(2, res.data);
          this.$router.push({ path: `/admin/${res.data.userId}` });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // Date et heure du post
    dateTime: function (value) {
      return moment(value).format('DD.MM.YY');
    },
    hour: function (value) {
      return moment(value).format('HH:mm');
    },
    // Supprimer un post
    deletePost: function (post) {
      const user = JSON.parse(localStorage.getItem('user'));
      const id = post.id;
      if (confirm('Souhaitez-vous vraiment supprimer ce post?')) {
        instance
          .delete(`http://localhost:3000/api/posts/${id}`, {
            headers: {
              Authorization: 'Bearer ' + user.token,
            },
          })
          .then(() => {
            this.$router.go();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    toggleModale: function (post) {
      this.currentPost = post;
      this.displayModale = true;
    },
    receiveStateFromChild() {
      this.displayModale = false;
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 18px;
  text-align: center;
  padding-top: 15px;
  margin-top: 15px;
}

.card {
  width: 636px;
  padding: 25px;
  margin: 20px 0;
  background: white;
  border-radius: 30px;
  box-shadow: 0 6px 9px rgb(0 0 0 / 5%), 0 18px 10px rgb(0 0 0 / 4%);
}

.user-infos {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 22px;
  padding: 4px 12px;
  background-color: #fdc6ba;
  box-shadow: 0 0 0 rgb(0 0 0 / 1%), 0 2px 5px rgb(0 0 0 / 30%);
}

.name {
  margin-right: 50%;
}

.svg-inline--fa {
  width: 16px;
  height: 16px;
}

.profile-picture {
  width: 50px;
  height: 50px;
  margin-right: 12px;
  border-radius: 25px;
}

.update-btn {
  padding: 12px;
  font-size: 17px;
  border: none;
  border-radius: 8px;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  color: #fff;
  z-index: 1;
  margin-top: 15px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  cursor: pointer;
  background: linear-gradient(#f5a42a, #b55f04);
}

.delete-btn {
  float: right;
  padding: 12px;
  font-size: 17px;
  border: none;
  border-radius: 8px;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  background: linear-gradient(#f52a2a, #7a0a0a);
  color: #fff;
  z-index: 1;
  margin-top: 15px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  cursor: pointer;
}

.delete-btn:after,
.update-btn:after {
  position: absolute;
  content: '';
  width: 0;
  height: 100%;
  top: 0;
  right: 0;
  z-index: -1;
  background: #e0e5ec;
  transition: all 0.3s ease;
}

.delete-btn:hover,
.update-btn:hover {
  transform: scale(1);
  cursor: pointer;
}

.profile {
  margin: 0;
  padding: 8px;
  background: linear-gradient(#ff4f03, #bd6b18);
}

.svg-inline--fa {
  font-size: 17px;
}

.trash {
  margin-left: 10px;
}

.date {
  margin-top: 5px;
  font-size: 12px;
  margin-bottom: 10px;
}

.image-container {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  background-color: #f3f3f3;
}

.text {
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  background-color: #f3f3f3;
}

.btn-container {
  display: flex;
  justify-content: space-between;
}

/* MEDIA QUERIES */
@media screen and (min-width: 769px) and (max-width: 992px) {
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .card {
    width: 95%;
  }

  .name {
    margin-right: 57%;
  }

  .svg-inline--fa {
    width: 16px;
    height: 16px;
  }
}

@media screen and (min-width: 501px) and (max-width: 768px) {
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .card {
    width: 95%;
  }
  .svg-inline--fa {
    width: 16px;
    height: 16px;
  }

  .name {
    margin-right: 30%;
  }
}

@media screen and (min-width: 300px) and (max-width: 500px) {
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .card {
    width: 95%;
    padding: 15px;
  }
  .svg-inline--fa {
    width: 16px;
    height: 16px;
  }

  .name {
    margin-right: 0%;
  }

  .user-infos {
    font-size: 14px;
  }
}
</style>
