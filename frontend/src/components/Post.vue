<template>
  <div>
    <div class="post" :key="index" v-for="(post, index) in allPosts">
      <div class="post__container">
        <p class="connected-user-name">
          Publié par : {{ post.authorFullName }}
        </p>
        <br />
        <p>le {{ dateTime(post.createdAt) }} à {{ hour(post.createdAt) }}</p>
        <br />
        <div>
          <img
            v-if="post.imageUrl"
            class="post__imageUrl"
            :src="post.imageUrl"
            alt="Image postée"
            width="200"
          />
        </div>
        <p class="post__text">{{ post.text }}</p>
        <button
          v-if="post.userId == userId"
          @click="deletePost(post)"
          class="post__delete--btn"
        >
          Supprimer le post
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import instance from '../axios';
import user from '../user';

export default {
  name: 'Post',
  data() {
    return {
      allPosts: [],
      user: {},
      userId: user.userId,
      isAdmin: user.isAdmin,
    };
  },
  mounted() {
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
      .catch(() => {
        alert('Erreur!');
      });
  },
  methods: {
    getOneUser: function (post) {
      let id = post.userId;
      instance
        .get(`http://localhost:3000/api/auth/${id}`, {
          headers: { Authorization: 'Bearer ' + user.token },
        })
        .then((res) => {
          console.log(2, res.data);
        })
        .catch(() => {
          alert('Server error');
        });
    },
    dateTime: function (value) {
      return moment(value).format('DD.MM.YY');
    },
    hour: function (value) {
      return moment(value).format('HH:mm');
    },
    deletePost: function (post) {
      const id = post.id;
      console.log(id);
      if (confirm('Souhaitez-vous vraiment supprimer ce post?')) {
        instance
          .delete(`http://localhost:3000/api/posts/${id}`, {
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
.post {
  height: auto;
  width: 540px;
  padding: 32px;
  margin: 15px 0;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

h1 {
  font-size: 20px;
}

.post__delete--btn {
  margin: 35px 0;
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

.post__delete--btn {
  background-color: #fd6546;
  transform: scale(1);
  cursor: pointer;
}
</style>
