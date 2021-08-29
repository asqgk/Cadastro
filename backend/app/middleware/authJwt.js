const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Usuario = db.usuario;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.usuarioId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  Usuario.findByPk(req.usuarioId).then(usuario => {
    usuario.getRoles().then(tipousuarios => { 
      for (let i = 0; i < tipousuarios.length; i++) {
        if (tipousuarios[i].tipo === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  Usuario.findByPk(req.usuarioId).then(usuario => {
    usuario.getRoles().then(tipousuarios => {
      for (let i = 0; i < tipousuarios.length; i++) {
        if (tipousuarios[i].tipo === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  Usuario.findByPk(req.usuarioId).then(usuario => {
    usuario.getRoles().then(tipousuarios => {
      for (let i = 0; i < tipousuarios.length; i++) {
        if (tipousuarios[i].tipo === "moderator") {
          next();
          return;
        }

        if (tipousuarios[i].tipo === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;