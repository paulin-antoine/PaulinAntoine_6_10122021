<template>
  <div class="nav-block">
    <h1 id="first-title">Bienvenue sur le réseau social interne !</h1>
    <nav>
      <!--Bouton inscription où déconnexion en fonction de l'état-->
      <p class="log-sign"><router-link to="/login">connexion</router-link></p>
      <br /><br />
      <p v-if="!userLoged" class="log-sign">
        <router-link to="/signup">inscription</router-link>
      </p>
      <p v-if="userLoged" v-on:click="logout" class="log-sign">
        <a>Déconnexion</a>
      </p>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userLoged: localStorage.getItem("userId"),
    };
  },
  methods: {
    logout: function () {
      localStorage.clear();
      this.$router.push("/");
      location.reload();
    },
  },
};
</script>

<style lang="css">
.nav-block {
  background-image: url("../assets/work-office.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 50%;
  height: 250px;
  margin: auto;
  margin-top: 50px;
  border-radius: 15px;
  padding: 30px 0 30px 0;
}
nav {
  background-color: transparent;
  margin-top: 50px;
  height: 50px;
}
#first-title {
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 1.5em;
  padding-bottom: 30px;
  padding-top: 30px;
  box-shadow: 0 4px 2px -2px rgb(189, 189, 189);
}
.log-sign {
  background-color: transparent;
}
.log-sign > a {
  font-size: 1.2em;
  color: white;
  background: linear-gradient(#ffa888, #ff733c);
  padding: 7px 20px;
  border-bottom: solid #a73f16 2px;
  border-radius: 15px;
  box-shadow: 0 4px 2px -2px rgb(173, 173, 173);
  cursor: pointer;
}
@media screen and (max-width: 750px) {
  .nav-block {
    width: 80%;
  }
}
@media screen and (max-width: 400px) {
  .nav-block {
    width: 100%;
    height: 300px;
  }
}
</style>