const Post = require("../models/Post.js");
const database = require("../db/db.js");
const fs = require("fs");

exports.post = (req, res, next) => {
  let Post = {
    idusers: req.body.idusers,
    message: req.body.post,
    datePost: req.body.date,
  };

  database
    .query(
      `INSERT INTO crud.post (idusers, message, datePost) VALUES (${Post.idusers},"${Post.message}",'${Post.datePost}')`
    )
    .then((result) => {
      console.log(result[0].insertId);
      return res
        .status(201)
        .json({ message: "post créé", idPost: result[0].insertId });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getPostsList = (req, res, next) => {
  database
    .query(
      "SELECT * FROM crud.post INNER JOIN crud.users ON crud.post.idusers=crud.users.idusers ORDER BY idPost DESC"
    )
    .then((result) => {
      return res.status(200).json(result[0]);
    })
    .catch((error) =>
      res.status(404).json({ message: "Soyez le premier à publier" })
    );
};
exports.incrementId = (req, res, next) => {
  let postID = req.params["idPost"];
  let actualUser = req.body.actualUser;

  database
    .query(
      `SELECT * FROM crud.liked WHERE idPost=${postID} AND idusers=${actualUser}`
    )
    .then((result) => {
      if (!result[0][0]) {
        database
          .query(
            `INSERT INTO crud.liked (idPost, idusers, liked) VALUES (${postID},${actualUser}, 1)`
          )
          .then(() => {database
          .query(
            `UPDATE crud.post SET likes = likes + 1 WHERE idPost=${postID}`
          )
          .then(() =>
            res.status(201).json({message: "like incrémenté"})
          )
          .catch((error) => res.status(400).json({ error }));})
          
        
        
      } else if (result[0][0].idPost == postID && result[0][0].liked == 1) {
        database
          .query(
            `UPDATE crud.liked SET liked = 0 WHERE idPost=${postID} AND idusers=${actualUser}`
          )
          .then(() =>{database
          .query(
            `UPDATE crud.post SET likes = likes - 1 WHERE idPost=${postID}`
          )
          .then(() => 
            res.status(201).json({ message: " like décrémenté" })
          )
          .catch((error) => res.status(400).json({ error }));})
          
        
      } else {
        database
          .query(
            `UPDATE crud.liked SET liked = 1 WHERE idPost=${postID} AND idusers=${actualUser}`
          )
          .then(() => {database
            .query(
              `UPDATE crud.post SET likes = likes + 1 WHERE idPost=${postID}`
            )
            .then(() =>
              res.status(201).json({ message: "likes incrémentés" })
            )
            .catch((error) => res.status(400).json({ error }));})
          
        
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.addPostImage = (req, res, next) => {
  const postId = req.params["insertId"];
  const image = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  database
    .query(`UPDATE crud.post SET picturePost='${image}' WHERE idPost=${postId}`)
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "image ajoutée" });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deletePost = (req, res, next) => {
  const postId = req.params["idPost"];
  database
    .query(`SELECT * FROM crud.post WHERE idPost=${postId}`)
    .then((result) => {
      if (result[0][0].picturePost != null) {
        const filename = result[0][0].picturePost.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          database
            .query(`DELETE FROM crud.post WHERE idPost=${postId}`)
            .then(() => res.status(200).json({ message: "post supprimé" }))
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        database
          .query(`DELETE FROM crud.post WHERE idPost=${postId}`)
          .then(() => res.status(200).json({ message: "utilisateur supprimé" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getLike = (req, res, next) => {
  const postId = req.params["idPost"];
  database
    .query(`SELECT * FROM crud.liked WHERE idPost=${postId}`)
    .then((result) => res.status(200).json({ result: result[0][0]}))
}