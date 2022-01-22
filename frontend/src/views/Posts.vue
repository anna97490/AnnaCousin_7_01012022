<template>
  <div>
    <Header />
    <div class="container">
      <div class="posts-creation">
        <h1>Créez votre publication:</h1>
        <div class="posts-content">
          <form>
            <label for="text"><span>Rédigez votre publication:</span></label>
            <textarea id="text" v-model="text" aria-label="Contenu du message"></textarea>
          </form>
        </div>
        <div class="posts-file">
          <div class="posts-img">
            <label for="file"><span>Ajouter une image:</span></label>
            <input type="file" id="file-input" name="image" enctype="multipart/form-data" @change="onFileSelected" accept="image/png, image/jpeg, image/jpg"/>
            <div class="posts-publish">
              <button class="create-btn" @click="createPost()">Publier</button>
            </div>
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
      user: JSON.parse(localStorage.getItem('user')),
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile: function () {
      let user = JSON.parse(localStorage.getItem('user'))
      instance.get(`http://localhost:3000/api/auth/${user.userId}`, {
          headers: { Authorization: 'Bearer ' + user.token },
        })
        .then((res) => {
          this.fullName = `${res.data.firstname} ${res.data.lastname}`;
        })
        .catch((err) => {
          console.log(err)
        });
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(10, this.selectedFile)
    },
    createPost: function () {
      const user = JSON.parse(localStorage.getItem('user'))
      let fd = new FormData();
      fd.append('userId', user.userId);
      fd.append('authorFullName', this.fullName);
       if (this.text != "") {
        fd.append("text", this.text);
      }
       if (this.selectedFile) {
        fd.append("image", this.selectedFile);
      }
       if (this.text || this.selectedFile) {
         instance.post('http://localhost:3000/api/posts', fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + user.token,
          },
        })
        .then((res) => {
          console.log(10, res);
          alert('Votre publication a bien été créée!');
          //this.$router.go();
        })
        .catch((req) => {
          console.log(req.file)
        });
       } 
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0 29%;
  background-color: #ffe6e1
}

.posts-creation {
  padding: 15px;
  background-color: #ffe6e1;
}

.posts-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
}

.posts-file {
  width: 100%;
}

h1 {
  width: 100%;
  margin: 20px 0 10px 0;
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
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
  font-size: 12px;
}

.posts-img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

#file-input {
  width: 200px;
  font-size: 12px;
}

.posts-img label {
  width: 100%;
  margin-bottom: 8px;
  font-size: 15px;
}

.posts-publish {
  display: flex;
  justify-content: center;
  align-items: center;
}

.create-btn {
  padding: 16px;
  margin-left: 30px;
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

.create-btn:hover {
  background-color: #fd6546;
  transform: scale(1);
  cursor: pointer;
}

.posts-container {
    background-color: #ffe6e1;
    margin-top: 15px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    width: 630px;
    justify-content: center
}

.posts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #f7d0c8;
}
</style>
