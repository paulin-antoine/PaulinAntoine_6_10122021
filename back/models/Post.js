
module.exports = class Post {
    constructor(idPost, idusers, message, picturePost, datePost){
        this.idPost = null;
        this.idusers = null;
        this.message = message;
        this.picturePost = picturePost;
        this.likes = 0;
        this.datePost = datePost;
    }   
};

