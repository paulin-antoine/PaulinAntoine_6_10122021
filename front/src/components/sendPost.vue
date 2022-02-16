<template>
  <div id="forms">
    <form class="post-form">
      <label for="post-area" class="post-area"><p>Publiez quelque-chose</p></label><br/>
      <input name="post-area" class="area" placeholder="placez ici votre message..." required v-model="post">
      <br />
    </form>
    <form id="picture-form">
      <img id="output" /><br>
      <input
        v-on:change="displayPicture"
        type="file"
        ref="file"
        accept="image/*"
        name="image"
        id="picture-post"
      />
      <label for="picture-post" class="picture-post-label">ajouter une image</label>
      <button v-if="display == true" v-on:click="reload" id="revert">annuler</button>    
    </form>
    <button id="submit-btn" type="submit" v-on:click="postMessage">publier</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "sendPost",
  data() {
    return {
      file: "",
      post: "",
      image: "",
      datePost: "",
      display: false,
    };
  },

  methods: {
    displayPicture: function (event) {
      var reader = new FileReader();
      var myForm = document.getElementById("picture-form");
      const formData = new FormData(myForm);
      formData.append("image", event.target.files[0]);
      this.file = event.target.files[0];
      console.log(this.file);
      reader.onload = function () {
        var output = document.getElementById("output");
        output.src = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.display = true;
    },
    reload: function() {
      location.reload();
    },
    postMessage: function () {
      let idusers = localStorage.getItem("userId");
      let date = new Date();
      let convertDate =
        ("0" + date.getDate()).slice(-2) +
        "/" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear() +
        " à " +
        date.getHours() +
        "h" +
        date.getMinutes();
      var myForm = document.getElementById("picture-form");
      const formData = new FormData(myForm);
      //formData.append("image", this.file);

      axios
        .post(
          "http://localhost:3000/api/post",
          {
            post: this.post,
            idusers: idusers,
            file: this.file.name,
            date: convertDate,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (this.file != "") {
            axios.put(
              `http://localhost:3000/api/post/${res.data.idPost}`,
              formData,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            ).then(() => {alert("image ajouté")})
            .catch((error) => {console.log(error)});
            
          }location.reload();
        })
         .catch((error) => {if (error.response.status === 401) {
                  localStorage.clear();
                  this.$router.push('/');
             }})
    },
  },
};
</script>

<style lang="css">
#forms {
  padding: 10px;
  margin-top: 30px;
  background-color: white ;
  box-shadow: 0 6px 5px -2px rgb(15, 2, 56);
}
.post-form {
  background-color: white;
  width: 90%;
  height: auto;
  margin: auto;
  padding-bottom: 10px;
}
.send-text-zone {
  display: flex;
  width: 90%;
  flex-direction: column;
  margin: auto;
}
.post-area {
  display: block;
  text-align: left;
  margin-top: 5px;
  border-bottom: solid black 1px;
}
#submit-btn {
  width: 130px;
  height: 40px;
  font-size: 1.2em;
  margin-top: 50px;
  color: white;
  background: linear-gradient(#ffa888, #ff733c ) ;
  border: none;
  border-bottom: solid #a73f16 2px;
  border-radius: 10px;
  cursor: pointer;
}
#revert {
  width: 140px;
  height: 26px;
  font-size: 1em;
  color: white;
  margin-top: 5px;
  cursor: pointer;
  background: linear-gradient(#acacac, #616161 ) ;
  border: none;
  border-bottom: solid #303030 2px;
  border-radius: 10px;
}
.button-zone {
  display: flex;
  justify-content: space-between;
  height: 25px;
  width: 90%;
  margin: auto;
}
.area {
  display: block;
  width: 100%;
  height: 25px;
  box-sizing: border-box;
  padding: 5px;
  border: solid grey 1px;
  border-radius: 5px;
  background-color: rgb(236, 236, 236);
  box-shadow: inset -2px -2px 3px rgb(189, 189, 189);
}
#picture-post {
  display: none;
}

.picture-post-label {
  display: block;
  margin: auto;
  width: 120px;
  height: 21px;
  padding: 4px 10px 1px 10px;
  margin-top: 5px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.8em;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  background: linear-gradient(#9894d1, #634a9c ) ;
  border-bottom: solid #39196b 2px;
}
#output {
  border: dashed silver;
  min-height: 120px;
  min-width: 120px;
  max-width: 250px;
  border-radius: 10px;
  padding: 5px;
  background-image: url("../assets/add-img-logo.png");
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: center;
  background-color: white;
}
#picture-form {
  background-color: white;
  width: 90%;
  margin: auto;
}
#submit-btn, #revert, .picture-post-label {
  box-shadow: 0 4px 2px -2px rgb(189, 189, 189);
}
</style>
