const database = require("../db/db.js");

module.exports = class Comment {
    constructor(idcomments, idPost, message, idusers){
        this.idcomments = null;
        this.idPost = idPost;
        this.message = message;
        this.idusers = idusers;
    }   
};
