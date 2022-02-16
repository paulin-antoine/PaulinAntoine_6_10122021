const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const emailValidation = require("email-validator");
require("dotenv").config();
const User = require("../models/User.js");
const database = require("../db/db.js");

exports.signup = (req, res, next) => {
  if (!emailValidation.validate(req.body.email)) {
    return res
      .status(403)
      .json({ message: "Le format email n'est pas valide !" });
  };
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
        );
        database
          .query("INSERT INTO users SET ?", user)
          .then(() => {
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

exports.login = (req, res, next) => {
  database
    .query("SELECT idusers, pass, isAdmin FROM crud.users WHERE email=?", req.body.email)
    .then((result) => {
      if (!result[0]) {
        return res.status(404).json({ message: "Utilisateur inconnu" });
      } else { 
        bcrypt.compare(req.body.password, result[0][0].pass)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe non valide" });
          }
          res.status(200).json({
            isAdmin: result[0][0].isAdmin,
            userId: result[0][0].idusers,
            token: jwt.sign(
              {userId: result[0][0].idusers},
              `${process.env.SECRET_KEY}`,
              {expiresIn:"24h"},  
            )
          })
        })
      }
    }).catch(error => res.status(500).json(error));
};
