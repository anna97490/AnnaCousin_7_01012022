<template>
    <div class="bloc-modale" v-if="display">
        <div class="overlay">
            <div class="modale card">
                <div @click="sendStateModalToParent()" class="close-btn">X</div>
                 <form class="form">
                    <label for="text"><span>Rédigez votre nouveau texte:</span></label>
                    <textarea id="text" v-model="dataPost.text" aria-label="Contenu du message"></textarea>
                </form>
                <div class="posts-img">
                    <input type="file" id="file" name="image" enctype="multipart/form-data" @change="onFileSelected" aria-label="Choisir une image" />
                </div>
                 <div class="publish">
                    <button class="update-btn" @click="updatePost(dataPost)">Enregistrer les modifications</button>
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
                alert('Votre publication a bien été créée!');
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
    background-color: #d1d1d191;
    border: 1px solid black;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlay {
    position: fixed;
    top: 30%;
    bottom: 50%;
    left: 40%;
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

.post-img input {
    float: right;
}

#text {
    width: 100%;
    padding: 2px 12px;
    margin: 5px 0 15px;
    border-radius: 22px;
    font-size: 13px;
}

.modale {
    width: 470px;
    background: #fff;
    color: #333;
    border-radius: 20px;
    height: 225px;
    padding: 35px;
    position: fixed;
}

.btn-modale {
    position: absolute;
    top: 10px;
    right: 10px;
}

.update-btn {
    padding: 12px;
    font-size: 17px;
    border: none;
    border-radius: 8px;
    transform: scale(0.9);
    transition-property: transform;
    transition-duration: 0.4s;
    color: #fff;
    z-index: 1;
    width: 120px;
    margin-top: 15px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    cursor: pointer;
    background: linear-gradient(#f5a42a, #b55f04);
}
</style>
