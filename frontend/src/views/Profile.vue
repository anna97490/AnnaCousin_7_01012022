<template>
  <div class="profil">
    <Header />
    <div class="profile__container">
      <div class="profile__fields">
        <h1 class="profile__title">Mon profil</h1>
        <div class="profile__container">
          <div class="profile__file">
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
            <button @click="onUpload">Télécharger</button>
          </div>
          <div class="profile__container1">
            <p class="profile__datas">
              <strong>Prénom: </strong>{{ user.firstname }}
            </p>
            <p class="profile__datas">
              <strong>Nom: </strong>{{ user.lastname }}
            </p>
            <p class="profile__datas">
              <strong>Email: </strong>{{ user.email }}
            </p>
            <p class="profile__datas">
              Inscrit depuis le {{ dateTime(user.createdAt) }}
            </p>
            <p class="profile__datas" v-if="user.isAdmin">
              <strong>Rôle:</strong>Administrateur
            </p>
          </div>
          <button
            @click="updateProfile()"
            type="button"
            class="profile__delete"
          >
            Modifier
          </button>
          <button
            @click="deleteProfile()"
            type="button"
            class="profile__delete"
          >
            Supprimer votre compte
          </button>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import instance from '../axios';
import Header from '../components/Header.vue';
import user from '../user';
import moment from 'moment';

export default {
  data() {
    return {
      userId: user.userId,
      user: {},
      selectedFile: null,
    };
  },
  components: {
    Header,
  },

  created() {
    this.getProfile();
  },

  methods: {
    getProfile: function () {
      instance
        .get(`http://localhost:3000/api/auth/${user.userId}`, {
          headers: { Authorization: 'Bearer ' + user.token },
        })
        .then((res) => {
          this.user = res.data;
          console.log(res.data);
        })
        .catch(() => {
          this.message = 'Requete non authentifiée!';
        });
    },
    dateTime: function (value) {
      return moment(value).format('DD.MM.YY');
    },
    onFileSelected(event) {
      console.log(event);
      this.selectedFile = event.target.files[0];
    },
    onUpload() {
      const fd = new FormData();
      fd.append('imageUrl', this.selectedFile, this.selectedFile.name);
      instance
        .post(`http://localhost:3000/api/auth/${user.userId}/update`, fd)
        .then((res) => {
          console.log(res);
        });
    },
    deleteProfile: function () {
      if (confirm('Souhaitez-vous vraiment supprimer votre compte?')) {
        instance
          .delete(`http://localhost:3000/api/auth/${user.userId}/delete`, {
            headers: { Authorization: 'Bearer ' + user.token },
          })
          .then((res) => {
            if (res.status === 200) {
              alert('Le profil a bien été supprimé !');
            }
            localStorage.clear();
            this.$router.push('/');
          })
          .catch((res) => {
            if (res.response.status == 500) {
              alert('Erreur serveur!');
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.profile__container {
  padding: 32px;
}

.profile__fields {
  height: auto;
  width: 540px;
  padding: 32px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.profile__datas {
  width: 100%;
  margin: 5px 0;
}

.profile__title {
  width: 100%;
  margin: 6px 0 6px 0;
  text-align: center;
  font-size: 20px;
}

.profile__subtitle {
  color: white;
  height: 150px;
  width: 180px;
  background-color: #2e405e;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;
  padding: 10px;
  margin: auto;
}

.profile__img--type {
  margin: 5px 0;
  font-size: 12px;
}

.profile__container1 {
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
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
