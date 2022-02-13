<template>
<div id="login-block">
    <h1 id="h1-login" >Connectez-vous</h1>
    <div id="login-form">   
        <label>Email</label>
            <input class="login-input" id="login-input-mail" type="mail" v-model="email" required><br>

            <label>Mot de passe</label>
            <input class="login-input" id="login-input-pass" type="password" v-model="password" required>

            <div class="button">
                <button id="btn-4" class="submit" type="submit" v-on:click="connect">Je me connecte !</button>
            </div>
    </div>
    <p style="color: red">{{logErrorMessage}}</p>
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
                logErrorMessage: '',
                logValidMessage: '',
            }
        },
        mounted() {
            if (localStorage.getItem("token") != null) {
                router.push('wall');
            }
        },
        methods:{
             connect: async function() {
            await axios.post("http://localhost:3000/api/auth/login",
                {
                    email: this.email,
                    password: this.password
                }
                ) .then((res) => {
                   localStorage.setItem("token", res.data.token);
                    localStorage.setItem("userId", res.data.userId);
                    localStorage.setItem("isAdmin", res.data.isAdmin);
                    router.push("wall")
                }).catch(() => {this.logErrorMessage = "Mot de passe où e-mail non valide";
                                    document.getElementById("login-input-mail").style.border = "solid red 1px";
                                    document.getElementById("login-input-pass").style.border = "solid red 1px";
                                    setTimeout(() => {document.getElementById("login-input-mail").style.border = "solid silver 1px";
                                    document.getElementById("login-input-pass").style.border = "solid silver 1px";
                                    this.logErrorMessage = "";},3500)}
                );
                
             }}

    }
    
</script>
<style lang="css">
    #login-block {
        width: 50%;
        margin: auto;
        margin-top: 30px;
        height: 290px;
        
    }
    #h1-login {
        border-bottom: solid silver 1px;
        padding: 10px 0 10px 0;
        box-shadow: 0 5px 7px -2px rgb(207, 207, 207);
    }
    #login-block {
        background-color: white;
    }
    #login-form {
        height: 170px;
        width: 50%; 
        margin: auto;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        background-color: white;    
    }
    #login-form > * {
        background-color: white;
    }
    .login-input {
        border: solid silver 1px;
        border-radius: 5px;
        height: 25px;
        margin-top: 3px;
        box-shadow: 0 3px 5px -2px rgb(207, 207, 207);
    }
    #btn-4 {
        margin: auto;
        margin-bottom: 5px;
        font-size: 0.9em;
        color: white;
        background: linear-gradient(#ffa888, #ff733c ) ;
        padding: 5px 10px 3px 10px;
        border: none;
        border-bottom: solid #a73f16 2px;
        border-radius: 10px;
        box-shadow: 0 4px 2px -2px rgb(173, 173, 173);
        cursor: pointer;
    }
</style>