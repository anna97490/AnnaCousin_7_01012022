<template>
  <div class="card-container">
    <h1 class="title">Découvrez toutes les publications:</h1>
    <div class="card" :key="index" v-for="(post, index) in allPosts">
      <div>
        <p><strong>Publié par :</strong> {{ post.authorFullName }}
         <button v-if="post.userId == user.userId" @click="deletePost(post)" class="delete-btn">Supprimer<font-awesome-icon icon="trash" class="trash" /></button>
        </p>
        <p class="date">
          le {{ dateTime(post.createdAt) }} à {{ hour(post.createdAt) }}
        </p>
        <br />
        <div class="image-container">
          <img v-if="post.imageUrl" class="image" :src="post.imageUrl" alt="Image postée" />
        </div>
        <p class="text">{{ post.text }}</p>
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
          this.$router.go();
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
.title {
  font-size: 20px;
  text-align: center;
  padding-top: 15px;
  margin-top: 15px;
}

.card {
  height: auto;
  width: 585px;
  padding: 35px;
  margin: 20px 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 6px 9px rgb(0 0 0 / 5%), 0 18px 10px rgb(0 0 0 / 4%);
}

.delete-btn {
  float: right;
  border: none;
  font-size: 17px;
  border-radius: 8px;
  color: #A22D16;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
}

.delete-btn:hover {
  transform: scale(1);
  cursor: pointer;
}

.trash {
  margin-left: 10px;
}

.date {
  margin-top: 5px;
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

.text {
  padding: 10px;
  border-radius: 4px;
  background-color: #f3f3f3;
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
}

@media screen and (min-width: 300px) and (max-width: 768px) {
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .card {
    width: 95%;
  }
}

</style>
