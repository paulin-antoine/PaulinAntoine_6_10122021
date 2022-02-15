<template>
<div>
    <div>
        <bannerNav />
    </div>
    <div>
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
    

</style>