<template>
  <div class="profil">
    <Header />
    <div class="profile__container">
      <div class="profile__fields">
        <h1 class="profile__title">
          Bienvenue sur votre profil {{ userInfo.firstname }} !
        </h1>
        <div class="profile__container">
          <div class="profile-picture">
            <img v-if="this.selectedFile" :src="this.selectedFile" />
            <img v-else src="../assets/img-user-default.jpg" />
          </div>
          <div class="posts__file">
            <div class="posts__img">
              <label for="file">Choisir une nouvelle image de profil</label>
              <input type="file" id="file-input" name="image" enctype="multipart/form-data" @change="onFileSelected" accept="image/png, image/jpeg, image/jpg"/> 
              <button @click="addPicture()">Sauvegarder</button> 
            </div>
          </div>
          <div class="profile__container1">
            <p class="profile__datas">
              <strong>Prénom: </strong>{{ userInfo.firstname }}
            </p>
            <p class="profile__datas">
              <strong>Nom: </strong>{{ userInfo.lastname }}
            </p>
            <p class="profile__datas">
              <strong>Email: </strong>{{ userInfo.email }}
            </p>
            <p class="profile__datas">
              Inscrit depuis le {{ dateTime(userInfo.createdAt) }}
            </p>
            <p class="profile__datas" v-if="isAdmin">
              <strong>Rôle:</strong>Administrateur
            </p>
          </div>
          <!--<button
            class="profile__delete"
            type="button"
            @click="updateProfile()"
          ></button>-->
          <button @click="deleteProfile()" type="button" class="profile__delete">Supprimer votre compte</button>
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
  created() {
    this.getProfile()
  },
  methods: {
    getProfile: function () {
      this.account = JSON.parse(localStorage.getItem('user'))
      if (this.account?.userId) {
        instance.get(`http://localhost:3000/api/auth/${this.account.userId}`, {
            headers: { Authorization: 'Bearer ' + this.account.token },
          })
        .then((res) => {
          this.userInfo = res.data;
          this.isAdmin = this.account.isAdmin
        })
        .catch(() => {
          this.message = 'Requete non authentifiée!';
        });
      }
    },
    dateTime: function (value) {
      return moment(value).format('DD.MM.YY');
    },
    onFileSelected(event) {
				this.selectedFile = event.target.files[0]
        console.log(10, this.selectedFile)
			},
    addPicture() {
     this.account = JSON.parse(localStorage.getItem('user'))
				const fd = new FormData();
				fd.append("image", this.selectedFile);
				instance.put('http://localhost:3000/api/auth/' + this.account.userId, fd, {
					headers: {
						'Authorization': 'Bearer ' + this.account.token,
						'Content-Type': 'multipart/form-data'
					}
				})
				.then((res) => {
					console.log(res)
				})
				.catch(err => {
          console.log(err)
				})
      .then((res) => {
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
.profile__container {
  padding: 22px;
}

.file__input {
  width: 200px;
  font-size: 10px;
}

.profile__fields {
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

.profile__datas {
  width: 100%;
  margin: 5px 0;
  padding: 12px;
  font-size: 15px;
  border-radius: 6px;
}

.profile__datas--date {
  font-size: 13px;
}

.profile__title {
  width: 100%;
  margin: 6px 0 6px 0;
  text-align: center;
  font-size: 20px;
}

.profile-picture {
  display: flex;
  justify-content: center;
}
.profile__img {
  display: flex;
  align-items: center;
}

.img {
  margin-right: 50px;
}

img {
  width: 155px;
  height: 160px;
}

.profile__container1 {
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0;
}

.profile__delete {
  width: 52%;
  padding: 16px;
  margin-top: 15px;
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

.profile__delete:hover {
  background-color: #fd6546;
  transform: scale(1);
  cursor: pointer;
}

/* MEDIA QUERIES */
@media screen and (min-width: 769px) and (max-width: 992px) {
  .card {
    width: 93%;
  }
}

@media screen and (min-width: 300px) and (max-width: 768px) {
  .card {
    width: 98%;
  }
}
</style>
