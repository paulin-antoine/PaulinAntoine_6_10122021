<template>
    <div id="user-info">
        <p v-if="message.error">{{message.error}}</p>
        <p v-if="message.info">{{message.info}}</p>
        <form id="form-profile">
            <label>Prénom</label>
        <input class="input-info" type="text" v-model="firstname" required>&nbsp; 

        <label>Nom</label>  
        <input class="input-info" type="text" v-model="lastname" required><br>    

        <label>Email</label>
        <input class="input-info" type="mail" v-model="email" required><br>

        <label>Mot de passe</label>
        <input class="input-info" type="password" v-model="password" required>

        <div class="button">
            <button id="btn-1" type="submit" v-on:click="updateInfo">Sauvegarder</button>
            <button id="btn-2" type="submit" v-on:click="deleteProfile">Supprimer le compte</button>
        </div>

        </form>
    </div>
</template>

<script>
 import axios from 'axios'

export default {
    name: "userInfo",
    data() {
        return {
                firstname: '',
                lastname: '',
                email: '',
                password: '',

            message: {
                    error:"",
                    info:""
                }
            }
                       
    },
    mounted() {
        axios.get("http://localhost:3000/api/user",
         {
             headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")               
            }
         }
        ).then((res) => { this.firstname = res.data.firstname;
                          this.lastname = res.data.lastname;
                          this.email = res.data.email;
        })
        .catch(() => {this.message.error = "impossible de récuperer les données utilisateur"})
    },
    methods: {
        updateInfo: function() {
            let userID = localStorage.getItem("userId");
            axios.put(`http://localhost:3000/api/user/${userID}`,
                    {
                        firstname: this.firstname,
                        lastname: this.lastname,
                        email: this.email,
                        password: this.password
                    },
                    {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("token"),
                            'content-Type': 'application/json'
                        }
                    }
            ).then(() => {this.message.info = "Utilisateur mis à jour"})
              .catch((error) => {if (error.response.status === 401) {
                  localStorage.clear();
                  this.$router.push('/');
             }})
        },
    
        deleteProfile: function() {
            let userID = localStorage.getItem("userId");
            axios.delete(`http://localhost:3000/api/user/${userID}`,
                {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        }
                    }
            ).then((res) => {console.log(res),this.message.info = "compte supprimer"})
              .catch((error) => {if (error.response.status === 401) {
                  localStorage.clear();
                  this.$router.push('/');
             }})
             
        }
    }
}
</script>

<style lang="css">
    #user-info {
        width: 50%;
        margin: auto;
        margin-bottom: 50px;
        height: 390px;
        background-color: white;
    }
    .input-info {
        border: solid silver 1px;
        height: 25px;
        margin-top: 3px;
        border-radius: 5px;
        box-shadow: 0 3px 5px -2px rgb(207, 207, 207);
    }
    #form-profile, .button {
        background-color: white;
    }
    #form-profile > * {
        background-color: white;
    }
    #form-profile {
        width: 50%;
        margin: auto;
        margin-top: -20px;
        padding-top: 4%;
        display: flex;
        flex-direction: column;
    }
    .button {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 25px;
    }
    #btn-1, #btn-2 {
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