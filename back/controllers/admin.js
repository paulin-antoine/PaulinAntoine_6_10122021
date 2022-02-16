const database = require("../db/db.js");
const fs = require("fs");

//Récupère la liste de tout les utilisateurs si l'utilisateur est admin
exports.getAllUsers = (req, res, next) => {
  let admin = req.params["id"];
  if (admin == 1) {
    database
      .query(`SELECT * FROM crud.users`)
      .then((result) => res.status(200).json(result[0]))
      .catch((error) => res.status(404).json(error));
  }
};

//Supprime l'utilisateur siéléctionné et retire l'image du système
exports.deleteUser = (req, res, next) => {
  let userID = req.params["userID"];
  database
    .query(`SELECT pictureName FROM crud.users WHERE idusers=${userID}`)
    .then((result) => {
      if (result[0][0].pictureName != null) {
        const filename = result[0][0].pictureName.split("/images/")[1];
        console.log(filename);

        fs.unlink(`images/${filename}`, () => {
          database
            .query(`DELETE FROM crud.users WHERE idusers=${userID}`)
            .then(() =>
              res.status(200).json({ message: "utilisateur supprimé" })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        database
          .query(`DELETE FROM crud.users WHERE idusers=${userID}`)
          .then(() => res.status(200).json({ message: "utilisateur supprimé" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
