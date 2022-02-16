<template>
  <div class="block">
    <div>
      <bannerNav />
    </div>
    <div class="post-block">
      <sendPost />
    </div>
    <!--Boucle pour afficher tout les posts-->
    <div
      v-for="post in posts"
      :key="post.idPost"
      :value="post.idPost"
      class="get-post"
    >
      <getPost :post="post"> </getPost>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import bannerNav from "@/components/bannerNav.vue";
import sendPost from "@/components/sendPost.vue";
import getPost from "@/components/getPost.vue";

export default {
  name: "wall",
  components: {
    bannerNav,
    sendPost,
    getPost,
  },

  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.getPostsList();
  },

  methods: {
    //Récupération des posts dans la base de données
    getPostsList: function () {
      axios
        .get("http://localhost:3000/api/post", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((data) => {
          this.posts = data.data;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/");
          }
        });
    },
  },
};
</script>

<style lang="css">
.block {
  width: 60%;
  margin: auto;
  padding-bottom: 20px;
}
.get-post {
  margin: auto;
  height: auto;
  margin-top: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}
@media screen and (max-width: 900px) {
  .block {
    width: 80%;
  }
}
@media screen and (max-width: 350px) {
  .block {
    width: 100%;
  }
}
</style>