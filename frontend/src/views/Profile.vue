<template>
  <div>
    <Header />
      <div class="body">
        <div class="post">
          <div class="post__container">
            <p class="post__header">Nom du user</p>
            <div class="post__asset">
              <img class="post__asset--img" src="../assets/icon-left-font.png" alt="Image publiée" />
            </div>
            <label class="post__label" for="description">Parlez-nous de vous:</label>
            <textarea class="post__text" aria-label="Contenu du message" required></textarea>
            <div class="post__btn">
              <button  class="post__btn--update"><strong>Modifier</strong></button>
              <button  class="post__btn--delete"><strong>Supprimer</strong></button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script scoped>
import Header from "../components/Header";
//import axios from "axios";
export default {
  name: 'Profile',
  components: {
    Header
  },
}
</script>

<style scoped>
.post__container {
  height: auto;
  width: 540px;
  padding: 32px;
  background:white;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.post {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}

.post__header {
  width: 100%;
  padding: 2%;
}

.post__asset {
  height: 250px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.post__text {
  font-size: 10px;
  width: 100%;
  height: 150px;
  padding: 12px;
  margin-top: 15px;
  margin-bottom: 35px;
  border: none;
  border-radius: 8px;
  background:#f2f2f2;
  font-weight: 500;
  font-size: 15px;
  flex:1;
  min-width: 100px;
  color: black;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.post__btn {
  display: flex;
  justify-content: space-between;
}

.post__btn--update {
  width: 25%;
  padding: 13px;
  font-size: 17px;
  border: none;
  border-radius: 8px;
  color:white;
  background-color: #FF5533;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.post__btn--update:hover {
  transform: scale(1);
  cursor: pointer;
  background-color: #fc7156;
}

.post__btn--delete {
  width: 25%;
  padding: 13px;
  font-size: 17px;
  border: none;
  border-radius: 8px;
  color:white;
  background-color: #1976D2;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.post__btn--delete:hover {
  transform: scale(1);
  cursor: pointer;
  background-color: #4295e9;
}

.card__signup {
  width: 100%;
  margin: 2% 41%;
  font-size: 17px;
  text-decoration: none;
  color: #1976D2;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
}


.card__btn {
  width: 100%;
  padding: 16px;
  margin-top: 15px;
  font-size: 17px;
  border: none;
  border-radius: 8px;
  color:white;
  background-color: #FF5533;
  transform: scale(0.9);
  transition-property: transform;
  transition-duration: 0.4s;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.card__btn:hover {
  transform: scale(1);
  cursor: pointer;
  background-color: #1976D2;
}



/* MEDIA QUERIES */
@media screen and (min-width: 1201px) and (max-width: 1500px) {

}

@media screen and (min-width: 993px) and (max-width: 1200px) {

}

@media screen and (min-width: 769px) and (max-width: 992px) {

}

@media screen and (min-width: 481px) and (max-width: 768px) {}


</style>