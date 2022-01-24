<template>
  <div class="profil">
    <Header />
    <div class="container">
      <div class="profile-fields">
        <h1 class="title">Bienvenue sur votre profil {{ userInfo.firstname }} !</h1>
        <div class="profile-container">
          <div class="picture-container">
            <img v-if="this.userInfo.imageUrl" :src="this.userInfo.imageUr" />
            <img v-else src="../assets/img-user-default.jpg" />
          </div>
          <div>
            <div class="posts-img">
              <label for="file">Choisir une nouvelle image de profil:</label>
              <input type="file" id="file-input" name="image" enctype="multipart/form-data" @change="onFileSelected" aria-label="Choisir une image" /> 
            </div>
            <div class="btn-container">
              <button class="save-btn" @click="addPicture()">Sauvegarder</button>
            </div> 
          </div>
          <div class="datas-container">
            <p class="profile-datas">
              <strong>Prénom: </strong>{{ userInfo.firstname }}
            </p>
            <p class="profile-datas">
              <strong>Nom: </strong>{{ userInfo.lastname }}
            </p>
            <p class="profile-datas">
              <strong>Email: </strong>{{ userInfo.email }}
            </p>
            <p class="profile-datas">
              Inscrit depuis le {{ dateTime(userInfo.createdAt) }}
            </p>
            <p class="profile-datas" v-if="isAdmin">
              <strong>Rôle:</strong>Administrateur
            </p>
          </div>
          <button @click="deleteProfile()" type="button" class="delete-btn">Supprimer le compte</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '../axios';
import Header from '../components/Header.vue';
import moment from 'moment';

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      userInfo: {},
      selectedFile: null,
      account: null,
      isAdmin: false
    };
  },
  components: {
    Header,
  },
  mounted() {
    this.account = JSON.parse(localStorage.getItem('user'))
    if (this.account?.userId) {
      instance.get(`http://localhost:3000/api/auth/${this.account.userId}`, {
        headers: { Authorization: 'Bearer ' + this.account.token },
      })
      .then((res) => {
        this.userInfo = res.data;
        this.isAdmin = this.account.isAdmin
      })
      .catch((err) => {
        console.log(err)
      });
    }
  },
  methods: {
    dateTime: function (value) {
      return moment(value).format('DD.MM.YY');
    },
    onFileSelected(event) {
				this.selectedFile = event.target.files[0]
        console.log(10, this.selectedFile)
			},
    addPicture() {
      let user = JSON.parse(localStorage.getItem('user'))
			const fd = new FormData();
				fd.append("image", this.selectedFile);
				instance.put(`http://localhost:3000/api/auth/${user.userId}/update`, fd, {
					headers: {
						'Authorization': 'Bearer ' + user.token,
						'Content-Type': 'multipart/form-data'
					}
				})
      .then((res) => {
        this.$router.go();
        console.log(10, res.data);
        //this.$router.go();
      })
      .catch((req) => {
        console.log(req.file)
      });
    },
    deleteProfile: function () {
      if (confirm('Souhaitez-vous vraiment supprimer votre compte?')) {
        instance.delete(`http://localhost:3000/api/auth/${this.account.userId}/delete`, {
            headers: { Authorization: 'Bearer ' + this.account.token },
        })
        .then(() => {
          alert('Le profil a bien été supprimé !');
          localStorage.clear();
          this.$router.go();
        })
        .catch((err) => {
          console.log(err)
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 22px;
}

.profile-fields {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  height: auto;
  width: 540px;
  padding: 32px;
  margin: auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.title {
  width: 100%;
  margin: 6px 0 6px 0;
  text-align: center;
  font-size: 20px;
}

.picture-container {
  display: flex;
  justify-content: center;
}

.profile-datas {
  width: 100%;
  margin: 5px 0;
  padding: 12px;
  font-size: 15px;
  border-radius: 6px;
}

.posts-img {
  width: 100%;
}

.posts-img label {
  font-size: 13px;
}

#file-input {
  width: 100%;
  margin: 15px 0;
  font-size: 12px;
}

.profile__img {
  display: flex;
  align-items: center;
}

img {
  width: 155px;
  height: 160px;
}

.btn-container {
  display: flex;
  justify-content: center;
}

.save-btn {
   width: 74%;
  padding: 12px;
  font-size: 17px;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: #A22D16;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.save-btn:hover {
  transform: scale(1);
  cursor: pointer;
}

.datas-container {
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0;
}

.delete-btn {
  float: right;
  width: 40%;
  padding: 12px;
  font-size: 17px;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: #A22D16;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.delete-btn:hover {
  transform: scale(1);
  cursor: pointer;
}

/* MEDIA QUERIES */
@media screen and (min-width: 769px) and (max-width: 992px) {
  .profile-fields {
    width: 95%;
  }
}

@media screen and (min-width: 300px) and (max-width: 768px) {
  .profile-fields {
    width: 99%;
  }
  .delete-btn{
    word-break: break-word;
    float: none;
  }
}
</style>
