<template>
  <div id="signup-block">
    <h1 id="h1-signup">Inscription</h1>
    <div id="signup-form">
      <label>Prénom</label>
      <input
        class="signup-input"
        id="firstname"
        type="text"
        placeholder="Ex: Jean"
        v-model="firstname"
        required
      />&nbsp;

      <label>Nom</label>
      <input
        class="signup-input"
        id="lastname"
        type="text"
        placeholder="Ex: Dupont"
        v-model="lastname"
        required
      /><br />

      <label>Email</label>
      <input
        class="signup-input"
        id="email"
        type="mail"
        placeholder="Ex: jean@gmail.com"
        v-model="email"
        required
      /><br />

      <label>Mot de passe</label>
      <input
        class="signup-input"
        type="password"
        placeholder="Six caractères minimum"
        v-model="password"
        required
      />

      <div class="button">
        <button id="btn-3" type="submit" v-on:click="postInfos">
          Je m'inscris !
        </button>
      </div>
    </div>
    <p style="color: red">{{ errorMessage }}</p>
    <p style="color: green">{{ validMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "signup",

  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      errorMessage: "", //Affiche un message en cas d'erreur de saisie
      validMessage: "", //Affiche un message lorsque l'utilisateur est inscrit
    };
  },
  methods: {
    postInfos: function () {
      const firstname = this.firstname;
      const lastname = this.lastname;
      const email = this.email;
      const password = this.password;

      let regexFirstname = /^[A-Z][a-zA-Z]+$/.test(firstname);
      let regexLastname = /^[A-Z][a-zA-Z]+$/.test(lastname);
      let regexMail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
        email
      );
      //Alerte par une bordure rouge en cas de mauvaise saisie
      if (regexFirstname == false) {
        document.getElementById("firstname").style.border = "solid red 1px";
        this.errorMessage = "Le prénom n'est pas valide";
        setTimeout(() => {
          document.getElementById("firstname").style.border =
            "solid silver 1px";
          this.errorMessage = "";
        }, 3500);
      } else if (regexLastname == false) {
        document.getElementById("lastname").style.border = "solid red 1px";
        this.errorMessage = "Le nom n'est pas valide";
        setTimeout(() => {
          document.getElementById("lastname").style.border = "solid silver 1px";
          this.errorMessage = "";
        }, 3500);
      } else if (regexMail == false) {
        document.getElementById("email").style.border = "solid red 1px";
        this.errorMessage = "Le mail n'est pas valide";
        setTimeout(() => {
          document.getElementById("email").style.border = "solid silver 1px";
          this.errorMessage = "";
        }, 3500);
      } else {
        //Envoi des informations d'inscription à la base de données
        axios
          .post(
            "http://localhost:3000/api/auth/signup",
            {
              firstname: firstname,
              lastname: lastname,
              email: email,
              password: password,
            },
            {
              headers: {
                "content-Type": "application/json",
              },
            }
          )
          .then(() => {
            this.validMessage = "Merci pour votre inscription";
            setTimeout(() => {
              router.push("login");
            }, 2500);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.errorMessage =
                "Le mot de passe doit contenir au minimum 6 caractères";
            } else if (error.response.status === 500) {
              this.errorMessage = "L'utilisateur existe déjà";
            }
          });
      }
    },
  },
};
</script>

<style lang="css">
#signup-block {
  width: 50%;
  margin: auto;
  margin-top: 30px;
  height: 420px;
}
#h1-signup {
  border-bottom: solid silver 1px;
  padding: 10px 0 10px 0;
  box-shadow: 0 5px 7px -2px rgb(207, 207, 207);
}
#signup-block,
#signup-form,
#signup-form > * {
  background-color: white;
}
#signup-form {
  height: 300px;
  width: 50%;
  margin: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.signup-input {
  border: solid silver 1px;
  border-radius: 5px;
  height: 25px;
  margin-top: 3px;
  box-shadow: 0 3px 5px -2px rgb(207, 207, 207);
}
#btn-3 {
  margin: auto;
  font-size: 0.9em;
  margin-bottom: 5px;
  color: white;
  background: linear-gradient(#ffa888, #ff733c);
  padding: 5px 10px 3px 10px;
  border: none;
  border-bottom: solid #a73f16 2px;
  border-radius: 10px;
  box-shadow: 0 4px 2px -2px rgb(173, 173, 173);
  cursor: pointer;
}
@media screen and (max-width: 1050px) {
  #signup-block {
    width: 70%;
  }
}
@media screen and (max-width: 700px) {
  #signup-block {
    width: 85%;
  }
  #signup-form {
    width: 70%;
  }
}
@media screen and (max-width: 350px) {
  #signup-block {
    width: 100%;
  }
  #signup-form {
    width: 80%;
  }
}
</style>
