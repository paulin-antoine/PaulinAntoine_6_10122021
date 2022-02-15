<template>
    <div class="user-list">
      <h1 id="h1-user">Liste des utilisateurs</h1>
      <div v-for="user in users" :key="user.idusers" class="user">
          <p>ID: {{user.idusers}} {{user.firstname}} {{user.lastname}}</p>
           <button v-on:click="deleteUser(user.idusers)" id="user-btn">Supprimer</button>
      </div><br>
      {{message}}
    </div>
</template>

<script>
import axios from 'axios'
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
      
    getAllUsers: function () {
        let admin = localStorage.getItem("isAdmin");
      axios
        .get(`http://localhost:3000/api/admin/${admin}`, 
        
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((data) => {
          this.users = data.data;
          console.log(data.data);
        })
         .catch((error) => {if (error.response.status === 401) {
                  localStorage.clear();
                  this.$router.push('/');
             }})
    },
    deleteUser: function(userID) {
         axios
        .delete(`http://localhost:3000/api/admin/${userID}`, 
        
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
            this.message = "Utilisateur supprimé";
           setTimeout((function() {window.location.reload();}), 1500);
 
        })
         .catch((error) => {if (error.response.status === 401) {
                  localStorage.clear();
                  this.$router.push('/');
             }})
    }
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
  width: 90%;
  height: 20px;
  margin: auto;
  margin-bottom: 7px;
  border: solid grey 1px;
  background-color: white;
}
#user-btn {
  font-size: 0.9em;
  color: white;
  height: 100%;
  background: linear-gradient(#ffa888, #ff733c ) ;
  border: none;
  border-bottom: solid #a73f16 2px;
  box-shadow: 0 4px 2px -2px rgb(173, 173, 173);
  cursor: pointer;
}
</style>