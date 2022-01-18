<template>
  <div>
    <Header />
    <div>
      <div class="posts__creation">
        <h1>Découvrez toutes les publications</h1>
        <h2>Créez votre publication:</h2>
        <div class="posts__content">
          <label for="text"><span>Rédigez votre texte:</span></label>
          <textarea
            id="text"
            class="posts__text"
            v-model="text"
            aria-label="Contenu du message"
          >
          </textarea>
        </div>
        <div class="posts__img">
          <input
            style="display: none"
            type="file"
            @change="onFileSelected"
            ref="fileInput"
          />
          <label class="file-label" for="file"></label>
          <button @click="$refs.fileInput.click()">
            Sélectionnez votre image
          </button>
        </div>
        <div class="posts__publish">
          <button class="posts__publish--btn" @click="createPost()">
            Publier
          </button>
        </div>
      </div>
      <div class="posts">
        <Post />
      </div>
    </div>
  </div>
</template>

<script>
import Post from '../components/Post.vue';
import Header from '../components/Header.vue';
import instance from '../axios';
import user from '../user';

export default {
  name: 'Posts',
  components: {
    Header,
    Post,
  },
  data() {
    return {
      id: '',
      text: '',
      imageUrl: '',
      fullName: '',
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    onFileSelected(event) {
      this.imageUrl = event.target.files[0];
    },
    getProfile: function () {
      instance
        .get(`http://localhost:3000/api/auth/${user.userId}`, {
          headers: { Authorization: 'Bearer ' + user.token },
        })
        .then((res) => {
          console.log(res.data.firstname);
          this.fullName = `${res.data.firstname} ${res.data.lastname}`;
        })
        .catch(() => {
          this.message = 'Requete non authentifiée!';
        });
    },
    createPost: function () {
      console.log(this.fullName);
      if (this.text == '') {
        this.message = 'Veuillez écrire votre message!';
        return;
      }
      let fd = new FormData();
      fd.append('text', this.text);
      fd.append('imageUrl', this.imageUrl);
      fd.append('userId', user.userId);
      fd.append('authorFullName', this.fullName);
      instance
        .post('http://localhost:3000/api/posts', fd, {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        })
        .then(() => {
          this.message = 'Post created!!';
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.posts__creation {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #ffe6e1;
}
.posts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

h1 {
  margin: 20px 0 10px 0;
  width: 100%;
  text-align: center;
  font-size: 20px;
}

h2 {
  width: 100%;
  margin-bottom: 15px;
  text-align: center;
  font-size: 18px;
}

.posts__content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.posts__content label {
  width: 100%;
  text-align: center;
  margin-bottom: 8px;
  font-size: 15px;
}

textarea {
  height: 100px;
  width: 410px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;
  padding: 10px;
  margin-bottom: 20px;
}

.posts__img {
  display: flex;
  flex-wrap: wrap;
}

.posts__img label {
  width: 100%;
  font-size: 15px;
  margin-bottom: 8px;
}

.posts__publish {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.posts__publish--btn {
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

.posts__publish--btn:hover {
  background-color: #fd6546;
  transform: scale(1);
  cursor: pointer;
}
</style>
