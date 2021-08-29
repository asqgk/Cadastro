const db = require("../models");
const config = require("../config/auth.config.js");
const Usuario = db.usuario;
const TipoUsuario = db.tipousuario;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  Usuario.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)    
  })
    .then(usuario => {
      if (req.body.tipousuarios) {
        TipoUsuario.findAll({
          where: {
            tipo: {
              [Op.or]: req.body.tipousuarios
            }
          }
        }).then(tipousuarios => {
          usuario.setRoles(tipousuarios).then(() => {
            res.send({ message: "Usuário registrado com sucesso!" });
          });
        });
      } else {
        // user role = 1
        usuario.setRoles([1]).then(() => {
          res.send({ message: "Usuário registrado com sucesso!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  Usuario.findOne({
    where: {
        username: req.body.username
    }
  })
    .then(usuario => {
      if (!usuario) {
        return res.status(404).send({ message: "Usuario Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        usuario.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: usuario.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      usuario.getRoles().then(tipousuarios => {
        for (let i = 0; i < tipousuarios.length; i++) {
          authorities.push("TIPOUSUARIO_" + tipousuarios[i].tipo.toUpperCase());
        }
        res.status(200).send({
          id: usuario.id,
          username: usuario.username,
          email: usuario.email,
          tipousuarios: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
