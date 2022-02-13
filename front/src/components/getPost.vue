<template>
    <div>
        <div class="post-box">
            <div class="user-name-zone">
                <div id="profile-picture-post-box">
                    <img v-if="post.pictureName" :src="post.pictureName" class="profile-picture-post">
                    <img v-if="!post.pictureName" src="../assets/avatar.png" class="profile-picture-post">
                    </div>
                    <p class="user-name-post">{{post.firstname}} {{post.lastname}}</p>
                    <span v-if="admin == 1" class="trash">
                        <a v-on:click="deletePost" class="trash"><fa class="trash" icon="trash-alt" /></a>
                        </span>
                    <span v-else-if="actualUser == post.idusers" class="trash">
                        <a v-on:click="deletePost" class="trash"><fa class="trash" icon="trash-alt" /></a>
                    </span>
                    
            </div>
            <div class="content-zone">
                <p class="text">{{post.message}}</p>
                <img :src="post.picturePost" class="picture-post-2">
                <div class="date">Posté le {{post.datePost}}</div>
            </div>
            <div class="comment-like-zone">
                <div class='icons-box'>
                    <div class="icon-comment-zone">
                <a v-if="liked == 0"><fa v-on:click="sendLike" icon="heart"  class="icon-comment" /></a>
                <a v-if="liked == 1"><fa v-on:click="sendLike" icon="heart" id="red-heart"  class="icon-comment" /></a>               
                <span class="icon-comment">&nbsp;{{this.like}}</span>
                </div>
                <div class="icon-comment-zone">
                {{numberOfComments}} <a v-on:click="show = !show"><fa icon="comment" class="icon-comment" /></a>
                </div>
                </div>
                <transition name="fade">
                    <div v-if="show" class="comment-block">
                        <div id="key" v-for="comment in comments" :key="comment.idcomments">
                        <div class="comment-message-block">                            
                            <p class="user-comment">{{comment.firstname}} {{comment.lastname}}&nbsp;
                                <span v-if="admin == 1" class="trash-2"><a class="trash-2" v-on:click="deleteComment(comment.idcomments)"><fa class="trash-2" icon="trash-alt" /></a></span>
                                <span v-else-if="actualUser == comment.idusers" class="trash-2"><a class="trash-2" v-on:click="deleteComment(comment.idcomments)"><fa class="trash-2" icon="trash-alt" /></a></span>
                            </p>
                            <p id="comment-message">{{comment.message}}</p>
                        </div><br>
                        </div>
                        <div class="send-comment-block">
                        <input type="text" name="comment" placeholder="Commentez..." v-model="comment.message" class="input-comment">
                        <label for="comment"><div v-on:click="sendComment" class="icon-pencil"><fa class="icon-pencil" icon="pencil-alt" /></div></label>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
    name: "getPost",
    props: {post: {type: Object}},
            
    data() {
        return {
        show: false,
        like: this.post.likes,
        liked: "",
        comment: {
            message: "",
        },
        message: {
            info: "",
        },
        comments: [],
        numberOfComments: "",
        actualUser: localStorage.getItem("userId"),
        admin: localStorage.getItem("isAdmin"), 
         
  }
},   methods: {
        getlike: function() {
            axios.get(`http://localhost:3000/api/post/${this.$props.post.idPost}`,
            {
             headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
                              
            }
         }).then((data) => {
             console.log(data.data.result.liked);
                  this.liked = data.data.result.liked;         
                    
        }) .catch((error) => {console.log(error)})
        },
       sendLike: function() {
           axios.post(`http://localhost:3000/api/post/${this.$props.post.idPost}`,
            {
                actualUser: this.actualUser
            },
         {
             headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
                              
            }
         }).then(() => {
             location.reload()
                                
        }) .catch((error) => {if (error.response.status === 401) {
                  localStorage.clear();
                  this.$router.push('/');
             }})
             
    },
        sendComment: function() {
            let idusers = localStorage.getItem("userId")
                axios.post(`http://localhost:3000/api/comments/${this.$props.post.idPost}`,
                    {
                        message: this.comment.message,
                        idusers: idusers,

                    }, 
                    {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("token"),
                            'content-Type': 'application/json'
                        }
                    }
                ).then(() => {this.comment.message = "", this.getCommentsList();
                    }
                    )
                     .catch((error) => {if (error.response.status === 401) {
                  localStorage.clear();
                  this.$router.push('/');
             }})
            },
             getCommentsList: function() { axios.get(`http://localhost:3000/api/comments/${this.$props.post.idPost}`,
         {
             headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
                              
            }
         }
        )
                .then((data) => {
                        this.comments = data.data;
                        this.numberOfComments = data.data.length;
                        console.log(data.data.length)
                    
                })
               .catch((error) => {if (error.response.status === 401) {
                  localStorage.clear();
                  this.$router.push('/');
             }})
    },
    deletePost: function() {
            
            axios.delete(`http://localhost:3000/api/post/${this.$props.post.idPost}`,
                {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        }
                    }
            ).then((res) => {console.log(res),this.message.info = "post supprimer",location.reload();})
              .catch((error) => {if (error.response.status === 401) {
                  localStorage.clear();
                  this.$router.push('/');
             }})
            
    },
    deleteComment: function(idcomments) {
            
            console.log(idcomments);
            axios.delete(`http://localhost:3000/api/comments/${idcomments}`,
                {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        }
                    }
            ).then((res) => {console.log(res),this.getCommentsList();})
              .catch((error) => {if (error.response.status === 401) {
                  localStorage.clear();
                  this.$router.push('/');
             }})
            
        }       
       
},
    mounted() {
        this.getCommentsList();
        this.getlike();
    }
    }

</script>

<style lang="css">
    .post-box {
        width: 100%;
        height: auto;
        margin: auto;
        padding-bottom: 10px;
        background-color: white;
    }
    .user-name-zone {
        height: 45px;
        box-shadow: 0 3px 3px -2px rgb(104, 103, 103);
        border-bottom: solid rgb(104, 103, 103) 1px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
    }
    .user-name-post, .user-name-zone, .trash {
        background-color: rgb(223, 223, 223);
    }
    .trash {
        margin: 3px 2px 0 0;
        cursor: pointer;
    }
    .content-zone {
        height: auto;
        position: relative;
        background-color: white;
    }
    .picture-post-2 {
        max-width: 25%;
        margin-left: -67%;
        margin: 15px 0 15px -67%;
    }
    .comment-like-zone {
        min-height: 30px;
        height: auto;
        border-top: solid silver 1px;
        background-color: white;
    }
    .icons-box {
        width: 95%;
        display: flex;
        justify-content: space-between;
        margin: auto;
        margin-top: 8px;
        margin-bottom: 20px;
        background-color: white;
    }
    .icon-comment, .icon-comment-zone {
        background-color: white;
    }
    
    .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
    opacity: 0;
    }
    .icon-liked {
        color: blue
    }
    .comment-block, .comment-block > *, .send-comment-block > * {
        background-color: white;
    }
    .send-comment-block {
        width: 70%;
        margin-left: 10px;
        margin-bottom: 10px;
        margin-top: 10px;
        border-bottom: solid black 2px;
    }
    .icon-pencil {
        display: inline-block;
        width: 20px;
        height: 100%;
        padding: 4px;
        cursor: pointer;
        background-color: white;
    }
    .input-comment{
        width: 85%;
        border: none;   
    }
    #profile-picture-post-box {
        display: flex;
        justify-content: center;
        overflow: hidden;
        width: 35px;
        height: 35px;
        margin: 2px;
        margin-top: 4px;
        border: solid grey 1px;
        border-radius: 50%;
    }
    .profile-picture-post {
        height: 37px;
    }
    .user-name-post {
        margin: auto;
        margin-left: 5px;
    }
    .text {
        width: auto;
        width: 70%;
        text-align: left;
        margin: 10px 0 0 4%;
    }
    .date {
        position: absolute;
        bottom: 2px;
        right: 4px;
        font-style: italic;
        font-size: 0.9em;
        color: grey;
        background-color: white;
    }
    #red-heart {
        color: red
    }
    .user-comment {
        font-weight: bold;
        max-width: 90%;
        font-size: 0.9em;
        text-align: left;
        margin: 10px 0 0 3px;
        padding-left: 3%;
    }
    #comment-message {
        display: inline-block;
        width: 90%;
        font-size: 0.8em;
        text-align: left;
        margin: 5px 0 0 0;
    }
    #key {
        display: flex;
    }
    .trash-2 {
        background-color: rgb(214, 222, 245);
    }
    .comment-message-block {
        display: inline-block;
        align-self: flex-start;
        margin: 10px 0 0 10px;
        border: solid rgb(191, 198, 231) 1px;
        border-radius: 20px;
        background-color: rgb(214, 222, 245);
        max-width: 60%;
        min-width: 35%;
        padding-bottom: 10px;
        box-shadow: 0 5px 7px -2px rgb(207, 207, 207);
    }
    .comment-message-block > * {
        background-color: rgb(214, 222, 245);
    }
    .icon-comment, .trash-2 {
        cursor: pointer;
    }
    .icon-comment:hover {
        transform: scale(1.3);
    }
</style>
