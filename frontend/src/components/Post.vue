<template>
  <div>
    <h1>Découvrez toutes les publications:</h1>
    <div class="card" :key="index" v-for="(post, index) in allPosts">
      <div>
        <p><strong>Publié par :</strong> {{ post.authorFullName }}</p>
        <br />
        <p class="card-date">
          le {{ dateTime(post.createdAt) }} à {{ hour(post.createdAt) }}
        </p>
        <br />
        <div class="image-container">
          <img v-if="post.imageUrl" class="image" :src="post.imageUrl" alt="Image postée" />
        </div>
        <p class="card-text">{{ post.text }}</p>
        <button v-if="post.userId == user.userId" @click="deletePost(post)" class="delete-btn"></button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import instance from '../axios';

export default {
  name: 'Post',
  data() {
    return {
      allPosts: [],
      user: JSON.parse(localStorage.getItem('user')),
      post: {},
      userId: this.userId,
      isAdmin: this.isAdmin,
    };
  },
  //created(post) {
    //console.log(2, this.user.userId)
    //console.log(3,post)
  //},
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'))
    instance.get(`http://localhost:3000/api/posts`, {
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    })
    .then((res) => {
      for (const post of res.data) {
        this.allPosts.push(post);
        //this.allPosts.sort();
      }
    })
    .catch((err) => {
      console.log(err)
    });
  },
  methods: {
    getOneUser: function (post) {
      const user = JSON.parse(localStorage.getItem('user'))
      let id = post.userId;
      instance.get(`http://localhost:3000/api/auth/${id}`, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
      .then((res) => {
        console.log(2, res.data);
      })
      .catch((err) => {
        console.log(err)
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
      const user = JSON.parse(localStorage.getItem('user'))
      const id = post.id;
      if (confirm('Souhaitez-vous vraiment supprimer ce post?')) {
        instance.delete(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        })
        .then(() => {
          this.$router.push('/posts');
        })
        .catch(() => {
          this.error;
        });
      }
    },
  },
};
</script>

<style scoped>
.card {
  height: auto;
  width: 585px;
  padding: 35px;
  margin: 15px 0;
  border: 15px solid #ffe6e1;
  background: white;
  box-shadow: 0 10px 5px rgb(0 0 0 / 5%), 0 16px 39px rgb(0 0 0 / 4%);
}

h1 {
  font-size: 20px;
  text-align: center;
  padding-top: 15px;
  margin-top: 15px;
}

.card-date {
  font-size: 12px;
}

.image-container {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
}

.image {
  width: 70px;
  height: 70px;
}

.card-text {
  padding: 10px;
  border-radius: 4px;
  background-color: #EFEFEF;
}

.delete-btn {
  margin: 15px 0;
  padding: 16px;
  border: none;
  font-size: 17px;
  border-radius: 8px;
  color: white;
  background-color: #ff5533;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.delete-btn:hover {
  background-color: #fd6546;
  transform: scale(1);
  cursor: pointer;
}

</style>
