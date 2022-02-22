<template>
  <div class="profile-picture-box">
    <h1 id="h1">Mon profil</h1>
    <form>
      <div id="field">
        <div class="profile-box">
          <img
            v-if="profile.pictureName"
            :src="profile.pictureName"
            class="profile-picture"
          />
          <img
            v-if="!profile.pictureName"
            src="../assets/avatar.png"
            class="profile-picture"
          /><br />
        </div>
        <div class="send-file">
          <input
            v-on:change="modifyAvatar"
            type="file"
            ref="file"
            accept="image/*"
            name="avatar"
            id="avatar"
          />
          <label for="avatar" class="avatar-label">Modifier ma photo </label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "profile",
  data() {
    return {
      file: "",
      profile: {
        idusers: localStorage.getItem("userId"),
        pictureName: "",
      },
    };
  },
  mounted() {
    this.getAvatar();
  },
  methods: {
    //Modifie la photo de profil
    modifyAvatar(event) {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      this.file = event.target.files[0];
      axios
        .post(
          `http://localhost:3000/api/user/${this.profile.idusers}`,
          formData,

          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.profile.pictureName = res.data;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            this.$router.push("/");
          }
        });
    },
    //Récupère la photo de profil
    getAvatar: function () {
      axios
        .get(
          `http://localhost:3000/api/user/${this.profile.idusers}`,

          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.profile.pictureName = res.data;
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
.profile-picture-box {
  width: 50%;
  margin: auto;
  margin-top: 30px;
  padding: 10px 0 15px 0;
}
#h1 {
  padding-bottom: 15px;
  border-bottom: solid silver 1px;
  box-shadow: 0 5px 7px -2px rgb(207, 207, 207);
}
#field,
.profile-picture-box,
.profile-picture-box > * {
  background-color: white;
}
.profile-box {
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 120px;
  height: 120px;
  margin: auto;
  border-radius: 50%;
  background-color: white;
}
.profile-picture {
  min-height: 135%;
  margin-top: -20px;
  background-color: white;
}
#field {
  display: block;
  width: 165px;
  height: 165px;
  margin: auto;
  margin-top: 20px;
  border: none;
}
#avatar {
  display: none;
}
.send-file {
  width: 150px;
  margin: auto;
  margin-top: 5px;
  padding: 5px;
  border-radius: 10px;
  color: white;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.9em;
  background: linear-gradient(#9894d1, #634a9c);
  border-bottom: solid #39196b 2px;
}
.avatar-label {
  cursor: pointer;
  border: none;
  background-color: transparent;
}
@media screen and (max-width: 1050px) {
  .profile-picture-box {
    width: 75%;
  }
}
@media screen and (max-width: 450px) {
  .profile-picture-box {
    width: 100%;
  }
}
</style>
