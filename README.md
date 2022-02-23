
## Voici les exigences émises par le comité de pilotage :

* La présentation des fonctionnalités doit être simple
* La création d'un compte doit être simple et possible depuis un téléphone mobile
* Le profil doit contenir très peu d'informations pour que sa complétion soit rapide
* La suppression du compte doit être possible
* l'accès à un forum où les salariés publient des contenus multimédias doivent être présents
* l'accès à un forum où les salariés publient des textes doivent être présents
* les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés
* le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre salariés

### Ce projet à été réalisé avec :

* Vue.js
* Express.js
* Node.js
* MySql (MySql-2)

## Demarrage

### Installez un fichier .env (à la racine du dossier back) et inserez:

```
SECRET_KEY =  votre clé secrete
DATABASE_PASS = votre mot de pass MySql

```
### Créez le schema CRUD et les différentes tables avec leurs colonnes:

```
CREATE TABLE users
(
    idusers INT PRIMARY KEY NOT NULL UNIQUE UNSIGNED AUTO INCREMENT,
    lastname VARCHAR(45) NOT NULL,
    firstname VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    pictureName VARCHAR(100),
    pass VARCHAR(512) NOT NULL,
    isAdmin TINYINT(1)   
)

CREATE TABLE post
(
    idPost INT PRIMARY KEY NOT NULL  UNIQUE UNSIGNED AUTO INCREMENT,
    idusers INT NOT NULL UNSIGNED ,
    message TEXT NOT NULL,
    picturePost VARCHAR(100),
    likes INT,
    Date NOT NULL,
    isAdmin TINYINT(1) 
    FOREIGN KEY (idusers-idx) REFERENCES users(idusers) ON DELETE CASCADE
)

CREATE TABLE comments
(
    idcomments INT PRIMARY KEY NOT NULL UNIQUE UNSIGNED AUTO INCREMENT,
    idPost INT NOT NULL,
    message VARCHAR(500),
    idusers INT UNSIGNED,
    FOREIGN KEY (idPost-idx) REFERENCE post(idPost) ON DELETE CASCADE
)

CREATE TABLE like
(
    idLiked INT PRIMARY KEY NOT NULL UNIQUE UNSIGNED AUTO INCREMENT,
    idPost INT NOT NULL,
    idusers INT NOT NULL,
    liked INT
    FOREIGN KEY (idPost-index) REFERENCE post(idPost)  ON DELETE CASCADE
)


```
Important: Déclarez une valeur de 1 dans la conne isAdmin pour le compte administrateur

## lancez le projet

Détails au README.md du front-end et du back-end.