<template>
  <div class="body">
    <Header />
    <div class="container">
      <div class="posts-creation">
        <h1 class="title">Créez votre publication:</h1>
        <div class="posts-content">
          <form>
            <label for="text">
              <span>
                <strong>Rédigez votre texte:</strong>
              </span>
            </label>
            <textarea id="text" v-model="text" aria-label="Contenu du message">
            </textarea>
          </form>
        </div>
        <div class="posts-file">
          <div class="posts-img">
            <form class="form">
              <label for="file">
                <strong>Choisissez l'image de votre publication:</strong>
              </label>
              <input
                type="file"
                id="file"
                name="image"
                enctype="multipart/form-data"
                @change="onFileSelected"
                aria-label="Choisir une image">
            </form>
          </div>
          <div class="publish">
            <button class="create-btn" @click="createPost()">Publier</button>
          </div>
        </div>
      </div>
    </div>
    <div class="posts-container">
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

export default {
  name: 'Posts',
  components: {
    Header,
    Post,
  },
  data() {
    return {
      selectedFile: null,
      text: '',
      fullName: '',
      userInfo: {},
      account: null,
      postId: Post.id
    };
  },
  mounted() {
    this.account = JSON.parse(localStorage.getItem('user'));
    if (this.account?.userId) {
      instance.get(`http://localhost:3000/api/auth/${this.account.userId}`, {
        headers: { Authorization: 'Bearer ' + this.account.token },
      })
      .then((res) => {
        this.userInfo = res.data;
        this.fullName = `${res.data.firstname} ${res.data.lastname}`;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    createPost: function () {
      let user = JSON.parse(localStorage.getItem('user'));
      let fd = new FormData();
      fd.append('userId', user.userId);
      fd.append('authorFullName', this.fullName);
      if (this.text != '') {
        fd.append('text', this.text);
      }
      if (this.selectedFile) {
        fd.append('image', this.selectedFile);
      }
      if (this.text == '' || this.selectedFile == '') {
        alert('Veuillez écrire votre texte');
      } else {
        instance.post('http://localhost:3000/api/posts', fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + user.token,
          },
        })
        .then((res) => {
          localStorage.setItem('post', JSON.stringify(res.data));
          alert('Votre publication a bien été créée!');
          this.$router.go();
        })
        .catch(() => {
          alert('Veuillez écrire votre texte');
        });
      }
    },
  },
};
</script>

<style scoped>
.body {
  background-color: #e9edf1;
}
.container {
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.posts-creation {
  width: 636px;
  padding: 15px;
  background-color: #ebeae9;
  border-radius: 10px;
  box-shadow: 0 10px 22px rgb(0 0 0 / 36%), 0 8px 16px rgb(0 0 0 / 3%);
}

.posts-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
}

.title {
  width: 100%;
  margin: 5px 0 10px 0;
  text-align: center;
  font-size: 18px;
}

form {
  width: 100%;
}

.posts-content label {
  font-size: 15px;
}

#text {
  max-height: 300px;
  max-width: 100%;
  width: 100%;
  padding: 2px 12px;
  margin: 5px 0 15px;
  border-radius: 22px;
  font-size: 13px;
}

.posts-file {
  display: flex;
  width: 100%;
}

.posts-img {
  height: 20px;
}

.form {
  width: 60%;
}

#file {
  font-size: 12px;
}

.posts-img label {
  font-size: 15px;
}

.create-btn {
  width: 120px;
  padding: 12px;
  font-size: 17px;
  border: none;
  border-radius: 25px;
  color: #fff;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  background: linear-gradient(#f99655, #bd3007);
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.create-btn:hover {
  transform: scale(1);
  cursor: pointer;
}

.posts-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #e9edf1;
}

.posts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 636px;
  margin-top: 20px;
  padding: 0 12px;
  border-radius: 10px;
  background-color: #6D95F3;
  box-shadow: 0 10px 21px rgb(0 0 0 / 45%), 0 20px 30px rgb(0 0 0 / 30%);
}

/* MEDIA QUERIES */
@media screen and (min-width: 769px) and (max-width: 992px) {
  .posts-creation {
    width: 100%;
    padding: 20px;
  }

  .posts-file {
    justify-content: space-between;
  }

  #file {
    width: 100%;
  }

  .posts {
    width: 100%;
    display: block;
  }
}

@media screen and (min-width: 501px) and (max-width: 768px) {
  .posts-creation {
    width: 100%;
    padding: 20px;
  }
 
  .posts-file {
    justify-content: space-between;
  }

  .form {
    width: 78%;
  }

  #file {
    width: 100%;
  }

  .posts {
    width: 100%;
    display: block;
  }
}

@media screen and (min-width: 300px) and (max-width: 500px) {
  .posts-creation {
    width: 100%;
    padding: 20px;
  }

  .title {
    font-size: 17px;
  }

  .posts-file {
    flex-wrap: wrap;
    justify-content: center;
  }

  .form {
    width: 100%;
  }

  .create-btn {
    margin-top: 30px;
  }

  .posts {
    width: 100%;
    display: block;
  }
}
</style>
