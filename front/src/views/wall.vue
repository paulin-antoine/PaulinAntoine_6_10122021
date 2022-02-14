<template>
<div class="block">
    <div class="nav-component">
        <bannerNav />
    </div>
    <div class="post-block">
        <sendPost />
    </div>
    <div v-for="post in posts" :key="post.idPost" :value="post.idPost" class="get-post">
        <getPost :post="post">
        </getPost>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import bannerNav from '@/components/bannerNav.vue'
import sendPost from '@/components/sendPost.vue'
import getPost from '@/components/getPost.vue'

export default {
    name: "wall",
    components: {
        bannerNav,
        sendPost,
        getPost
    },
    
    data() {
        return {
            posts: [],   
        }
    },
    mounted() {
        this.getPostsList();

    },
    
    methods: {
       getPostsList: function() { axios.get("http://localhost:3000/api/post",
         {
             headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
                              
            }
         }
        )
                .then((data) => {
                        this.posts = data.data;
                        console.log(data.data);
                        
                        
                    
                })
              .catch((error) => {if (error.response.status === 401) {
                  localStorage.clear();
                  this.$router.push('/');
             }})
    }
    
     
    } 
}
</script>

<style lang="css">
    .block {
        width: 50%;
        margin: auto;
        padding-bottom: 20px;
    }
    .nav-component {
        margin-top: 50px;  
    }
    .post-block {
        margin-top: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .get-post {
        margin: auto;
        margin-top: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
</style>