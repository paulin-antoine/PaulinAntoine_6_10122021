<template>
        <div class="icons-block">
            <div class="icons"><router-link to="/wall"><fa id="news" icon="newspaper" size="2x" /></router-link></div>
            <div class="icons"><router-link to="/profile"><fa id="user-icon" icon="user" size="2x" /></router-link></div>
            <div v-on:click="logout" class="icons" id="logout-icon"><fa id="logout" icon="sign-out-alt" size="2x" /></div>
        </div>
</template>

<script>

export default {
    name: "bannerNav",
    methods: {
        logout: function() {
            localStorage.clear();
            this.$router.push('/');
            location.reload();
        }
    }
}

</script>

<style lang="css">
    .icons-block{
        display: flex;
        justify-content: space-around;
        width: 300px;
        height: 50px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 6px 5px -2px rgb(15, 2, 56);
    }
    .icons{
        width: 30%;
        margin: auto;
        text-decoration: none;
        background-color: white;
    }
    #news, #user-icon, #logout {
        color: #2D137B;
        background-color: white;
    }
    #logout-icon {
        cursor: pointer;
        color: #2D137B;
        background-color: white;
    }

</style>