<template>
  <div class="user-list">
    <h1 id="h1-user">Liste des utilisateurs</h1>
    <div v-for="user in users" :key="user.idusers" class="user">
      <p>ID: {{ user.idusers }} {{ user.firstname }} {{ user.lastname }}</p>
      <button v-on:click="deleteUser(user.idusers)" id="user-btn">
        Supprimer
      </button>
      <button v-on:click="deleteUser(user.idusers)" id="user-btn-2">X</button>
    </div>
    <br />
    <p id="delete-message">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "panelAdmin",
  components: {},
  data() {
    return {
      users: [],
      message: "",
    };
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    //Récupère la liste de tout les utilisateurs
    getAllUsers: function () {
      axios
        .get(
          "http://localhost:3000/api/admin",

          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((data) => {
          this.users = data.data;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/");
          }
        });
    },
    //Supprime l'utilisateur séléctionné
    deleteUser: function (userID) {
      if (confirm("Voulez-vous vraiment supprimer l'utilisateur ?")) {
        axios
          .delete(`http://localhost:3000/api/admin/${userID}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
            this.message = "Utilisateur supprimé";
            setTimeout(function () {
              window.location.reload();
            }, 1500);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              localStorage.clear();
              this.$router.push("/");
            }
          });
      }
    },
  },
};
</script>

<style lang="css">
.user-list {
  width: 50%;
  background-color: white;
  margin: auto;
  margin-top: 50px;
  min-height: 100px;
  height: auto;
}
#h1-user {
  border-bottom: solid silver 1px;
  padding: 10px 0 10px 0;
  box-shadow: 0 5px 7px -2px rgb(207, 207, 207);
  margin-bottom: 20px;
}
.user {
  display: flex;
  justify-content: space-between;
  text-align: left;
  width: 90%;
  min-height: 20px;
  height: auto;
  margin: auto;
  margin-bottom: 7px;
  border: solid grey 1px;
  background-color: white;
}
#user-btn,
#user-btn-2 {
  font-size: 0.9em;
  color: white;
  height: auto;
  background: linear-gradient(#ffa888, #ff733c);
  border: none;
  border-bottom: solid #a73f16 2px;
  box-shadow: 0 4px 2px -2px rgb(173, 173, 173);
  cursor: pointer;
}
#user-btn-2 {
  display: none;
  background-color: white;
}
#delete-message {
  color: green;
  padding-bottom: 20px;
}
@media screen and (max-width: 1050px) {
  .user-list {
    width: 70%;
  }
}
@media screen and (max-width: 700px) {
  .user-list {
    width: 85%;
  }
  .user {
    width: 90%;
  }
}
@media screen and (max-width: 400px) {
  .user-list {
    width: 100%;
  }
  .user {
    width: 90%;
  }
  #user-btn {
    display: none;
  }
  #user-btn-2 {
    display: block;
    height: auto;
  }
}
</style>