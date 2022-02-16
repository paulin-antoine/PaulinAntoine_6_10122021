const Comments = require("../models/Comments.js");
const database = require("../db/db.js");

//Envoi un commentaire texte dans la table comments
exports.sendComment = (req, res, next) => {
  let Comments = {
    idcomments: null,
    idPost: req.params["idPost"],
    message: req.body.message,
    idusers: req.body.idusers,
  };
  database
    .query(
      `INSERT INTO crud.comments (idPost, message, idusers) VALUES (${Comments.idPost},"${Comments.message}",'${Comments.idusers}')`
    )
    .then(() => {
      return res.status(201).json({ message: "Post ajouté" });
    })
    .catch((error) => res.status(500).json({ error }));
};

//Récupère les commentaires d'un post séléctionné
exports.getCommentsList = (req, res, next) => {
    idPost = req.params["idPost"]
  database
    .query(
      `SELECT * FROM crud.comments INNER JOIN crud.users ON crud.comments.idusers=crud.users.idusers WHERE crud.comments.idPost = ${idPost} ORDER BY idcomments ASC`
    )
    .then((result) => {
      return res.status(200).json(result[0]);
    })
    .catch((error) => res.status(404).json({ error }));
};

//Supprime le commentaire séléctionné
exports.deleteComment = (req, res, next) => {
  const commentId = req.params["idcomments"];
      database.query(`DELETE FROM crud.comments WHERE idcomments=${commentId}`)
      .then(() => res.status(200).json({message: "commentaire supprimé"}))
      .catch((error) => res.status(400).json({error}))
}