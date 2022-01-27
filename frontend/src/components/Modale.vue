<template>
    <div class="bloc-modale" v-if="display" data-aos="fade-up" data-aos-easing="ease-in-out">
        <div class="overlay">
            <div class="modale card">
                <div @click="sendStateModalToParent()" class="close-btn"><font-awesome-icon icon="times-circle" /></div>
                 <form class="form">
                    <label for="text1" data-aos="fade-right" data-aos-delay="0"><strong>Rédigez votre nouveau texte:</strong></label>
                    <textarea id="text1" v-model="dataPost.text" data-aos="fade-right"  data-aos-delay="200" aria-label="Contenu du message"></textarea>
                </form>
                <div class="posts-img">
                    <input type="file" id="file" name="image" enctype="multipart/form-data" @change="onFileSelected" data-aos="fade-right"  data-aos-delay="700" aria-label="Choisir une image" />
                </div>
                 <div class="publish">
                    <button class="update-btn" @click="updatePost(dataPost)" data-aos="fade-right"  data-aos-delay="1200">Enregistrer</button>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
    import instance from '../axios';

    export default {
        name: 'Modale',
        props: [
            'toggleModale',
            'dataPost'
        ],
         data() {
            return {
                display: false,
                data: {},
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
        updatePost: function (post) {
            console.log(99, post)
            const id = post.id
            let user = JSON.parse(localStorage.getItem('user'))
            let fd = new FormData()
            fd.append('userId', user.userId)
            fd.append('authorFullName', post.authorFullName)
            if (post.text != "") {
                fd.append("text", post.text)
            }
            if (this.selectedFile) {
                fd.append("image", this.selectedFile);
            }
            if (post.text == "" || this.selectedFile == "") {
                alert('Veuillez écrire votre texte ou changer votre photo')
            } else {
            instance.put(`http://localhost:3000/api/posts/${id}`, fd, {
                headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + user.token,
                },
            })
            .then((res) => {
                localStorage.setItem('post', JSON.stringify(res.data));
                console.log(10, res.data);
                alert('Votre publication a bien été modifiée!');
                this.$router.go();
            })
            .catch(() => {
                alert('Veuillez écrire votre texte')
            });
        } 
        },
        close() {
            this.display = false
        },
        sendStateModalToParent() {
            this.$emit('closeModal')
        }
    },
    watch: {
        'toggleModale': function() {
            this.display = this.toggleModale
        },
        'dataPost': function() {
            console.log(6, this.dataPost)
            this.data = this.dataPost
        }
    },
}
</script>

<style scoped>
.bloc-modale {
    position: fixed;
    background-color: #d1d1d1d6;
    border: 1px solid black;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlay {
    position: fixed;
    top: 30%;
    bottom: 50%;
    left: 32%;
    right: 50%;
}

.form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
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
    width: 100%;
    padding: 6px 14px;;
    margin: 8px 0 15px;
    border-radius: 22px;
    font-size: 13px;
}

.modale {
    width: 540px;
    height: auto;
    background: #fff;
    color: #333;
    border-radius: 20px;
    padding: 23px;
    position: fixed;
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
    padding: 12px;
    font-size: 15px;
    border: none;
    border-radius: 8px;
    transform: scale(0.9);
    transition-property: transform;
    transition-duration: 0.4s;
    color: #fff;
    float: right;
    z-index: 1;
    width: 100px;
    margin-top: 15px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    cursor: pointer;
    background: linear-gradient(#f5a42a, #b55f04);
}
</style>
