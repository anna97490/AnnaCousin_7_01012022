<template>
  <div
    class="bloc-modale"
    v-if="display"
    data-aos="fade-up"
    data-aos-easing="ease-in-out">
    <div class="overlay">
      <div class="modale card">
        <div @click="sendStateModalToParent()" class="close-btn">
            <font-awesome-icon icon="times-circle" />
        </div>
        <form class="form">
            <label for="text1" data-aos="fade-right" data-aos-delay="0">
                <strong>Rédigez votre nouveau texte:</strong>
            </label>
            <textarea
                id="text1"
                v-model="dataPost.text"
                data-aos="fade-right"
                data-aos-delay="200"
                aria-label="Contenu du message">
            </textarea>
        </form>
        <div class="posts-img">
          <input
            type="file"
            id="file"
            name="image"
            enctype="multipart/form-data"
            @change="onFileSelected"
            data-aos="fade-right"
            data-aos-delay="700"
            aria-label="Choisir une image">
        </div>
        <div class="publish">
          <button
            class="update-btn"
            @click="updatePost(dataPost)"
            data-aos="fade-right"
            data-aos-delay="1200">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from '../axios'

export default {
    name: 'Modale',
    props: ['toggleModale', 'dataPost'],
    data() {
        return {
            display: false,
            data: {},
            selectedFile: null,
            text: '',
            fullName: '',
            userInfo: {},
            account: null  
        }
    },
    mounted() {
        // Récupération du user courant
        this.account = JSON.parse(localStorage.getItem('user'))
        if (this.account.userId) {
            instance.get(`http://localhost:3000/api/auth/${this.account.userId}`, {
                headers: { Authorization: 'Bearer ' + this.account.token },
            })
            .then((res) => {
                this.userInfo = res.data;
                this.fullName = `${res.data.firstname} ${res.data.lastname}`
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        // Modifier le post
        updatePost: function (post) {
            const id = post.id;
            let user = JSON.parse(localStorage.getItem('user'))
            let fd = new FormData()
            fd.append('userId', post.userId);
            fd.append('authorFullName', post.authorFullName)
            if (post.text != '') {
                fd.append('text', post.text)
            }
            if (this.selectedFile) {
                fd.append('image', this.selectedFile)
            }
            if (post.text == '' || this.selectedFile == '') {
                alert('Veuillez écrire votre texte ou changer votre photo');
            } else {
                instance.put(`http://localhost:3000/api/posts/${id}`, fd, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + user.token
                    },
                })
                .then((res) => {
                    localStorage.setItem('post', JSON.stringify(res.data))
                    alert('Votre publication a bien été modifiée!')
                    this.$router.go()
                })
                .catch(() => {
                    alert('Veuillez écrire votre texte')
                })
            }
        },
        sendStateModalToParent() {
            this.$emit('closeModal')
        }
    },
    watch: {
        toggleModale: function () {
            this.display = this.toggleModale
        },
        dataPost: function () {
            this.data = this.dataPost
        },
    },
};
</script>

<style scoped>
.bloc-modale {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: #d1d1d1d6;
}

.overlay {
    display: flex;
    position: fixed;
    top: 30%;
    left: 29%;
}

.form {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.form label {
    width: 100%;
}

.form span {
    font-size: 15px;
}

.post-img input {
    float: right;
}

#text1 {
    max-height: 300px;
    max-width: 100%;
    width: 100%;
    padding: 6px 14px;
    margin: 8px 0 15px;
    border-radius: 22px;
    font-size: 13px;
}

.publish {
    display: flex;
    justify-content: center;
}

#file {
    display: none;
}

.modale {
    position: fixed;
    width: 42%;
    padding: 23px;
    height: auto;
    background: #fff;
    color: #333;
    border-radius: 20px;
}

.close-btn svg {
    float: right;
    margin-bottom: 5px;
    font-size: 20px;
    color: #8d2608;
    cursor: pointer;
}

.btn-modale {
    position: absolute;
    top: 10px;
    right: 10px;
}

.update-btn {
    width: 100px;
    margin-top: 15px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    float: right;
    font-size: 15px;
    color: #fff;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    background: linear-gradient(#f5a42a, #b55f04);
    transform: scale(0.9);
    transition-property: transform;
    transition-duration: 0.4s;
}

.update-btn:hover {
  transform: scale(1);
  cursor: pointer;
}

/* MEDIA QUERIES */
@media screen and (min-width: 769px) and (max-width: 992px) {
    .overlay {
        left: 23%;
    }

    .modale {
        width: 54%;
    }
}

@media screen and (min-width: 501px) and (max-width: 768px) {
    .overlay {
        left: 17%;
    }

    .modale {
        width: 65%;
    } 
}

@media screen and (min-width: 300px) and (max-width: 500px) {
     .overlay {
        left: 10%;
    }

    .modale {
        width: 80%;
    }

    .form label {
        font-size: 15px;
    }

    .update-btn {
        padding: 7px;
        font-size: 13px;
    }
}
</style>
