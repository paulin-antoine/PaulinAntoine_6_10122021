<template>
<div>
    <div>
        <bannerNav />
    </div>
    <div id="profil-box">
    <userProfile />
    <userInfo />
    </div>
</div>
</template>

<script>
import userProfile from '@/components/userProfile.vue'
import bannerNav from '@/components/bannerNav.vue'
import userInfo from '@/components/userInfo.vue'


export default {
    name: "profile",
    components: {
        bannerNav,
        userProfile,
        userInfo    
    }
}
</script>

<style lang="css">
    
    #profile-box {
        width: 200px;
        height: 500px;
        border: solid black 2px;
    }
  
</style>