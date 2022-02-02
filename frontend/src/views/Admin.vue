<template>
  <div>
    <Header />
    <div class="container">
      <div class="profile-fields">
        <div class="picture-container">
          <img 
          v-if="profileInfos.imageUrl"
          class="profile-picture" 
          :src="profileInfos.imageUrl"
          alt="Photo de profil de l'auteur de la publication">
          <img
            class="profile-picture"
            v-else src="../assets/img-user-default.jpg"
            alt="Photo de profil par défaut">
          <p class="profile-datas">
            <strong>{{ profileInfos.firstname }} {{ profileInfos.lastname }}</strong>
          </p>
        </div>
        <div class="border"></div>
        <div class="datas-container">
          <p class="profile-datas">
            <strong>{{ profileInfos.email }}</strong>
          </p>
          <p class="profile-datas">
            Inscrit depuis le {{ dateTime(profileInfos.createdAt) }}
          </p>
        </div>
        <button @click="deleteProfile(id)" type="button" class="delete-btn">
          <strong>Supprimer cet utilisateur</strong>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '../axios'
import Header from '../components/Header.vue'
import moment from 'moment'

export default {
    name: 'Admin',
    components: {
        Header,
    },
    data() {
        return {
            profileInfos: {},
        };
    },
    created() {
        // Récupérer l'id contenu dans l'url 
        // Pour récupérer les infos de l'auteur du post
        let id = this.$route.params.id
        this.getInfos(id)
    },
    methods: {
        getInfos: function (id) {
            let user = JSON.parse(localStorage.getItem('user'))
            instance.get(`http://localhost:3000/api/auth/${id}`, {
                headers: { Authorization: 'Bearer ' + user.token }
            })
            .then((res) => {
                this.profileInfos = res.data
            })
            .catch((err) => {
                console.log(err)
            })
        },
        // Date de création du profil 
        dateTime: function (value) {
            return moment(value).format('DD.MM.YY');
        },
        // Suppression du profil
        deleteProfile: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            let id = this.$route.params.id
            if (confirm('Souhaitez-vous vraiment supprimer le compte de cet utilisateur?')) {
                instance.delete(`http://localhost:3000/api/auth/${id}/delete`, {
                    headers: { Authorization: 'Bearer ' + user.token },
                })
                .then(() => {
                    alert('Le profil a bien été supprimé !')
                    this.$router.push('/posts')
                })
                .catch((err) => {
                    console.log(err)
                     alert('Une erreur est survenue !')
                })
            }
        }
    }
}
</script>

<style scoped>
.container {
    height: 100%;
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
    border: 17px solid #1877f2;
    border-radius: 16px;
    box-shadow: 0 15px 29px rgb(0 0 0 / 20%), 0 8px 16px rgb(0 0 0 / 5%);;
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
    flex-wrap: wrap;
    width: 180px;
    border-radius: 8px;background-color: #f3f3f3;
    box-shadow: 0 10px 13px rgb(0 0 0 / 30%), 0 8px 16px rgb(0 0 0 / 10%);
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

.profile-picture {
    width: 180px;
    height: 160px;
    border-radius: 8px 8px 0 0;
}

.border {
  border-bottom: 1px solid #d5d5d58c;
}

.datas-container {
    display: flex;
    justify-content: center;
    margin: 35px 0 2px 0;
    flex-wrap: wrap;
    border-radius: 4px;
    padding: 0 20px;
    background-color: #f3f3f3;
    box-shadow: 0 10px 13px rgb(0 0 0 / 30%), 0 8px 16px rgb(0 0 0 / 10%);
}

.profile-datas {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 5px 0;
    padding: 10px;
    font-size: 15px;
    border-radius: 6px;
}

.profile-datas strong {
    margin-right: 5px;
}

.delete-btn {
    width: 190px;
    margin-top: 15px;
    padding: 12px;
    font-size: 15px;
    border: none;
    border-radius: 25px;
    transform: scale(0.9);
    transition-property: transform;
    transition-duration: 0.4s;
    color: #fff;
    background: linear-gradient(#ef660d, #971508);
    z-index: 1;
    box-shadow: 0 10px 13px rgb(0 0 0 / 30%), 0 8px 16px rgb(0 0 0 / 10%);
    cursor: pointer;
}

.delete-btn:hover {
    transform: scale(1);
    cursor: pointer;
}

/* MEDIA QUERIES */
@media screen and (min-width: 769px) and (max-width: 992px) {
    .profile-fields {
        width: 95%;
        padding: 50px
    }

    .datas-container {
        width: 100%;
    }
}

@media screen and (min-width: 300px) and (max-width: 768px) {
    .profile-fields {
        width: 99%;
        padding: 50px
    }

    .datas-container {
        width: 100%;
    }
    
    .delete-btn {
        word-break: break-word;
        float: none;
    }
}
</style>
