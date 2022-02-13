<template id="header">
        <header>
            <router-link to="/"><img class="logo" alt="logo-Groupomania" src = "../assets/icon.svg"></router-link>
            <router-link to="/panelAdmin">
                <button v-if="admin == 1" id="admin-btn">Liste des utilisateurs</button>
            </router-link>    
        </header>
</template>

<script>

export default {
    name: "banner",
    data() {
        return {
            admin: localStorage.getItem("isAdmin"),        
  }
}
}
</script>

<style lang="css">
#header {
    margin-top: 0;
}
    header{
        height: 100px;
        background-color: white;
    }
    .logo{
        height: 50px;
        margin-top: 1.5%;
        background-color: white;
    }
    #admin-btn {
        width: 150px;
        background-color: aquamarine;
        position: absolute;
        right: 20px;
        margin-top: 3%;
    }
   
</style>