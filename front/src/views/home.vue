<template>
    <div class="nav-block">
        <h1 id="first-title">Bienvenue sur le réseau social interne !</h1>
        <nav>
            <p class="log-sign"><router-link to="/login">connexion</router-link></p><br><br>
            <p v-if="!userLoged" class="log-sign"><router-link to="/signup">inscription</router-link></p>
        </nav>
        
    </div>
</template>

<script>
import axios from 'axios'
import router from "../router";

    export default {
        data() {
            return {
                email: '',
                password: '',
                userLoged: localStorage.getItem("userId"),
            }
        },
        methods:{
             connect: function() {
                let token = localStorage.getItem("token");
            axios.post("http://localhost:3000/api/auth/login",
                {
                    email: this.email,
                    password: this.password
                }
                ) .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
                    router.push("wall")
                })
        
             }}             
    }
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
        background-color : rgba(255,255,255,0.80);
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
        background: linear-gradient(#ffa888, #ff733c ) ;
        padding: 7px 20px;
        border-bottom: solid #a73f16 2px;
        border-radius: 15px;
        box-shadow: 0 4px 2px -2px rgb(173, 173, 173);
    }
    @media screen and (max-width: 750px) {
  .nav-block {
      width: 80%;
  }
}
     @media screen and (max-width: 350px) {
  .nav-block {
      width: 100%;
      height: auto;
  }
}
</style>