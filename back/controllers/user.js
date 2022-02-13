const database = require("../db/db.js");
const fs = require("fs");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

exports.avatar = (req, res, next) => {
  const userID = req.params["id"];
  const avatar = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

  database.query(`SELECT pictureName FROM crud.users WHERE idusers=${userID}`)
    .then((result) => { if (result[0][0].pictureName != null) {const filename = result[0][0].pictureName.split("/images/")[1];
    console.log(filename);
    
     fs.unlink(`images/${filename}`, () => {
       database.query(`UPDATE crud.users SET pictureName='${avatar}' WHERE idusers=${userID}`)
    .then(() => res.status(200).json(avatar))
    .catch((error) => res.status(400).json({error}))
     })}else{
      database.query(`UPDATE crud.users SET pictureName='${avatar}' WHERE idusers=${userID}`)
      .then(() => res.status(200).json(avatar))
      .catch((error) => res.status(400).json({error}))
     }})
    .catch((error) => res.status(500).json({error}));

};

exports.getInfo = (req, res, next) => {
  database
    .query(
      "SELECT firstname, lastname, email, pass FROM crud.users WHERE idusers=?",
      req.userId
    )
    .then((result) => {
      if (!result[0]) {
        return res.status(404).json({ message: "Utilisateur inconnu" });
      } else {
        let user = new User(
          result[0][0].firstname,
          result[0][0].lastname,
          result[0][0].email,
          result[0][0].picturename,
          result[0][0].pass
        );
        return res.status(200).json(user);
      }
    });
};

exports.updateInfo = (req, res, next) => {
    let userID = req.params["id"];
    if (req.body.password.length > 6) {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            let user = new User(
              req.body.firstname,
              req.body.lastname,
              req.body.email,
              req.body.picturename,
              hash
            ); console.log(userID);
            database
              .query(`UPDATE crud.users SET firstname="${req.body.firstname}",
                                            lastname="${req.body.lastname}",
                                            email="${req.body.email}",
                                            pass="${hash}"
                                            WHERE idusers="${userID}"`)
              .then((result) => {
                return res.status(201).json({ message: "Utilisateur créé" });
              })
              .catch((error) => res.status(500).json({ error }));
          })
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(403).json({
          message: "Le mot de passe doit contenir au minimum 6 caractères",
        });
      }
        
};

exports.deleteProfile = (req, res, next) => {
    let userID = req.params["id"]; 
    
    database.query(`SELECT pictureName FROM crud.users WHERE idusers=${userID}`)
    .then((result) => { if (result[0][0].pictureName != null) {const filename = result[0][0].pictureName.split("/images/")[1];
    console.log(filename);
    
     fs.unlink(`images/${filename}`, () => {
       database.query(`DELETE FROM crud.users WHERE idusers=${userID}`)
    .then(() => res.status(200).json({message: "utilisateur supprimé"}))
    .catch((error) => res.status(400).json({error}))
     })}else{
      database.query(`DELETE FROM crud.users WHERE idusers=${userID}`)
      .then(() => res.status(200).json({message: "utilisateur supprimé"}))
      .catch((error) => res.status(400).json({error}))
     }})
    .catch((error) => res.status(500).json({error}));

    
};
exports.getUserInfo = (req, res, next) => {
  let userID = req.params["id"];
  database.query(`SELECT firstname, lastname, pictureName FROM crud.users WHERE idusers=${userID}`)
  .then((result) => res.status(200).json(result[0][0].pictureName))
  .catch((error) => res.status(403).json({error}))
}

exports.getAllUsers = (req, res, next) => {
    database.query(`SELECT * FROM crud.users`)
    .then(() => res.status(200).json({message: "liste récupérée"}))
    .catch((error) => res.status(404).json(error))
  
}