<template>
  <div class="card-container">
    <h1 class="title">Découvrez toutes les publications:</h1>
    <div
      class="card"
      :key="index"
      v-for="(post, index) in allPosts"
      data-aos="fade-right"
      data-aos-easing="linear"
      data-aos-duration="700">
      <div>
        <p class="user-infos" >
          <img
            class="profile-picture"
            v-if="post.user.imageUrl"
            :src="post.user.imageUrl"
            alt="Photo de profil de l'auteur de la publication">
          <img
            class="profile-picture"
            v-else
            src="../assets/img-user-default.jpg"
            alt="Photo de profil par défaut">
          <span class="name">
            <strong>{{ post.authorFullName }}</strong>
          <p class="date">
            {{ dateTime(post.createdAt) }} 
          </p>
          </span>
          <span
            class="profile"
            v-if="isAdmin == true"
            @click="getOneUser(post)"
            ><font-awesome-icon icon="user" />
          </span>
        </p>
        <div class="image-container" v-if="post.imageUrl">
          <img
            v-if="post.imageUrl"
            class="image"
            :src="post.imageUrl"
            alt="Image postée">
        </div>
        <div class="image-container1" v-if="post.imageUrl === null"></div>
        <p class="text">{{ post.text }}</p>
        <div class="btn-container">
          <modale
            :dataPost="currentPost"
            :toggleModale="displayModale"
            v-on:closeModal="receiveStateFromChild">
          </modale>
          <span
            v-if="post.userId === user.userId || isAdmin === true"
            @click="toggleModale(post)"
            class="update-btn">
            <font-awesome-icon icon="edit" />
          </span>
          <span
            v-if="post.userId === user.userId || isAdmin === true"
            @click="deletePost(post)"
            class="delete-btn">
            <font-awesome-icon icon="trash" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import instance from '../axios'
import Modale from '../components/Modale.vue'

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
      currentPost: {}
    }
  },
  created() {
    this.getProfile()
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    instance.get(`http://localhost:3000/api/posts`, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
      .then((res) => {
        for (const post of res.data) {
          this.allPosts.push(post)
        }
      })
      .catch((err) => {
        console.log(err)
      });
  },
  methods: {
    // Récupération du current user
    getProfile: function () {
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
        })
      }
    },
    // Récupération des infos de l'auteur du post pour rediriger l'admin sur son profil
    getOneUser: function (post) {
      const user = JSON.parse(localStorage.getItem('user'))
      let id = post.userId;
      instance.get(`http://localhost:3000/api/auth/${id}`, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
      .then((res) => {
        this.$router.push({ path: `/admin/${res.data.userId}`})
      })
      .catch((err) => {
        console.log(err)
        alert('Une erreur est survenue!')
      })
    },
    // Date et heure du post
    dateTime: function (value) {
      moment.locale('fr')
      return moment(value).fromNow()
    },
    // Supprimer un post
    deletePost: function (post) {
      const user = JSON.parse(localStorage.getItem('user'))
      const id = post.id
      if (confirm('Souhaitez-vous vraiment supprimer ce post?')) {
        instance.delete(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        })
        .then(() => {
          this.$router.go()
        })
        .catch((err) => {
          console.log(err)
          alert('Une erreur est survenue lors de la suppression!')
        })
      }
    },
    // Modifier un post
    toggleModale: function (post) {
      this.currentPost = post
      this.displayModale = true
    },
    receiveStateFromChild() {
      this.displayModale = false
    }
  }
}
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
  padding: 17px;
  margin: 20px 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 9px rgb(0 0 0 / 5%), 0 18px 10px rgb(0 0 0 / 4%);
}

.user-infos {
  display: flex;
  align-items: center;
  border-radius: 22px;
  padding: 5px 15px;
  margin-bottom: 10px;
  background-color: #ebeae9;
  box-shadow: 0 0 0 rgb(0 0 0 / 1%), 0 2px 5px rgb(0 0 0 / 30%);
}

.profile-picture {
  width: 50px;
  height: 50px;
  margin-right: 12px;
  border-radius: 25px;
}

.update-btn {
  font-size: 17px;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  margin-top: 15px;
  color: #b55f04;
  cursor: pointer;
}

.delete-btn {
  float: right;
  font-size: 17px;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  color: #df500c;
  margin-top: 15px;
  cursor: pointer;
}

.delete-btn:hover,
.update-btn:hover {
  transform: scale(1);
  cursor: pointer;
}

.profile {
  color: grey;
  cursor: pointer;
}

.name {
  width: 85%;
}

.svg-inline--fa {
  font-size: 20px;
}

.trash {
  margin-left: 10px;
}

.date {
  margin-top: 5px;
  font-size: 13px;
}

.image-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 300px;
  background-color: #f3f3f3;
}

.text {
  padding: 10px;
  margin: 10px 0 13px 0;
  border-radius: 4px;
  background-color: #f3f3f3;
}

.btn-container {
  display: flex;
  justify-content: space-between;
  padding: 0 13px;
  border-top: 1px solid #d5d5d58c;
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

  .user-infos {
    justify-content: space-between;
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

  .user-infos {
    justify-content: space-between;
  }
}

@media screen and (min-width: 300px) and (max-width: 500px) {
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .card {
    width: 99%;
    padding: 15px;
  }

  .user-infos {
    justify-content: space-between;
    font-size: 14px;
  }

  .image-container {
    height: 215px;
  }
}
</style>
