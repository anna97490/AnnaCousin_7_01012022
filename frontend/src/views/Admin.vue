<template>
    <div>
        <Header />
        <div class="container">
             <div class="profile-fields">
                <div class="picture-container">
                    <img class="profile-picture" :src="profileInfos.imageUrl" />
                </div>
                <div class="datas-container">
                    <p class="profile-datas">
                        <strong>Prénom: </strong>{{ profileInfos.firstname }}
                    </p>
                    <p class="profile-datas">
                        <strong>Nom: </strong>{{ profileInfos.lastname }}
                    </p>
                    <p class="profile-datas">
                        <strong>Email: </strong>{{ profileInfos.email }}
                    </p>
                    <p class="profile-datas">
                        Inscrit depuis le {{ dateTime(profileInfos.createdAt) }}
                    </p>
                </div>
                <button  @click="deleteProfile(id)" type="button" class="delete-btn"><span>Supprimer cet utilisateur</span></button>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '../axios';
import Header from "../components/Header.vue"
import moment from 'moment';

export default {
    name: 'Admin',
    components: {
    Header,
    },
    data() {
        return {
            profileInfos: {},
            user: JSON.parse(localStorage.getItem('user'))
        }
    },
     props: {
        id: String
    },
    created() {
        let id = this.$route.params.id
        this.getInfos(id)
        console.log(20, id)
        this.currentId = this.getInfos(id)
    },
    methods: {
        getInfos: function (id) {
            this.user = JSON.parse(localStorage.getItem('user'))
            instance.get(`http://localhost:3000/api/auth/${id}`, {
                headers: { Authorization: "Bearer " + this.user.token }
            })
            .then((res) => {
                console.log(30,res.data)
                this.profileInfos = res.data
            })
            .catch((err) => {
                console.log(err)
            })
        },
        dateTime: function (value) {
            return moment(value).format('DD.MM.YY');
        },
        deleteProfile: function () {
            this.user = JSON.parse(localStorage.getItem('user'))
            let id = this.$route.params.id
            console.log(25,id)
            if (confirm('Souhaitez-vous vraiment supprimer le compte de cet utilisateur?')) {
            instance.delete(`http://localhost:3000/api/auth/${id}/delete`, {
                headers: { Authorization: 'Bearer ' + this.user.token },
            })
            .then(() => {
                alert('Le profil a bien été supprimé !');
                this.$router.push('/posts')
            })
            .catch((err) => {
                console.log(err)
                console.log(25,id)
            });
        }
    },
    }
}
</script>

<style scoped>
    .container {
        padding: 22px;
        background-color: #fff1ed;
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

    .profile-picture {
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
        padding: 12px;
        font-size: 17px;
        border: none;
        border-radius: 8px;
        transform: scale(0.9);
        transition-property: transform;
        transition-duration: 0.4s;
        background: linear-gradient(#f52a2a, #7a0a0a);
        color: #fff;
        width: 220px;
        margin-top: 15px;
        box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)
    }

    .delete-btn:hover {
        transform: scale(1);
        cursor: pointer;
    }
</style>
