<template>
  <div class="body">
    <Header />
    <div class="container">
      <div class="posts-creation">
        <h1 class="title">Créez votre publication:</h1>
        <div class="posts-content">
          <form>
            <label for="text"><span>Rédigez votre texte:</span></label>
            <textarea id="text" v-model="text" aria-label="Contenu du message"></textarea>
          </form>
        </div>
        <div class="posts-file">
          <div class="posts-img">
            <input type="file" id="file" name="image" enctype="multipart/form-data" @change="onFileSelected" aria-label="Choisir une image" />
          </div>
          <div class="publish">
            <button class="create-btn" @click="createPost()">Publier</button>
          </div>
        </div>
      </div>
    </div>
    <div class="posts">
      <div class="posts-container">
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
      Filelist: {},
      userInfo: {},
      account: null,
      user: JSON.parse(localStorage.getItem('user')),
    };
  },
  mounted() {
    this.account = JSON.parse(localStorage.getItem('user'))
    if (this.account?.userId) {
      instance.get(`http://localhost:3000/api/auth/${this.account.userId}`, {
        headers: { Authorization: 'Bearer ' + this.account.token },
      })
      .then((res) => {
        this.userInfo = res.data;
        this.fullName = `${res.data.firstname} ${res.data.lastname}`;
        console.log(20, this.userInfo)
      })
      .catch((err) => {
        console.log(err)
      });
    } 
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    createPost: function () {
      let user = JSON.parse(localStorage.getItem('user'))
      let fd = new FormData();
      fd.append('userId', user.userId);
      fd.append('authorFullName', this.fullName);
       if (this.text != "") {
        fd.append("text", this.text);
      }
       if (this.selectedFile) {
        fd.append("image", this.selectedFile);
      }
      if (this.text == "" || this.selectedFile == "") {
        alert('Veuillez écrire votre texte')
      } else {
         instance.post('http://localhost:3000/api/posts', fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + user.token,
          },
        })
        .then((res) => {
          localStorage.setItem('post', JSON.stringify(res.data));
          console.log(10, res.data);
          alert('Votre publication a bien été créée!');
          this.$router.go();
        })
        .catch(() => {
          alert('Veuillez écrire votre texte')
        });
      } 
    },
  },
};
</script>

<style scoped>
.body {
  background-color: #fff1ed;
}
.container {
  display: flex;
  justify-content: center;
}

.posts-creation {
  width: 636px;
  padding: 15px;
  background-color: #fd846c4d;
  border-radius: 10px;
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
  font-size: 20px;
}

form {
  width: 100%;
}

.posts-content label {
  width: 100%;
  margin-bottom: 8px;
  text-align: center;
  font-size: 15px;
}

#text {
  width: 100%;
  padding: 2px 12px;
  margin: 5px 0 15px;
  border-radius: 22px;
  font-size: 13px;
  max-height: 300px;
  max-width: 100%;
}

.posts-file {
  width: 100%;
}

.posts-img {
  height: 20px;
}

#file {
  float: right;
  width: 200px;
  font-size: 12px;
}

.posts-img label {
  width: 140px;
  margin-bottom: 8px;
  font-size: 15px;
}

.publish {
  display: flex;
  justify-content: center;
  align-items: center;
}

.create-btn {
  width: 120px;
  padding: 12px;
  font-size: 17px;
  border: none;
  border-radius: 8px;
  color: #fff;
  background: linear-gradient(#d17979, #8d2608);
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.create-btn:hover {
  transform: scale(1);
  cursor: pointer;
}

.posts-container {
  background-color: #fd846c4d;
  margin-top: 20px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  width: 636px;
  justify-content: center
}

.posts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #fff1ed;
}

/* MEDIA QUERIES */
@media screen and (min-width: 769px) and (max-width: 992px) {
  .posts-creation {
    width: 100%;
    padding: 20px;
  }
  .posts-container{
    width: 100%;
    display: block;
  }
}

@media screen and (min-width: 300px) and (max-width: 768px) {
    .posts-creation {
    width: 100%;
    padding: 20px;
  }
  .posts-container{
    width: 100%;
    display: block;
  }
  
}
</style>
