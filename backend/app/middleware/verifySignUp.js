const db = require("../models");
const TIPOUSUARIOS = db.TIPOUSUARIOS;
const Usuario = db.usuario;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Usuario
    Usuario.findOne({
        where: {
            username: req.body.username
        }
    }).then(usuario => {
        if (usuario) {
            res.status(400).send({
                message: "Este Username já está em uso!"
            });
            return;
        }

        // Email
        Usuario.findOne({
            where: {
                email: req.body.email
            }
        }).then(usuario => {
            if (usuario) {
                res.status(400).send({
                    message: "Este E-mail já está em uso!"
                });
                return;
            }

            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.tipousuarios) {
        for (let i = 0; i < req.body.tipousuarios.length; i++) {
            if (!TIPOUSUARIOS.includes(req.body.tipousuarios[i])) {
                res.status(400).send({
                    message: "Failed! Roles does not exist = " + req.body.tipousuarios[i]
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;