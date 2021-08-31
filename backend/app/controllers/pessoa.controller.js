const db = require("../models");
const Pessoa = db.pessoa;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nome || !req.body.sexo || !req.body.datanascimento || !req.body.numero) {
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
        return;
    }
    // console.log(req.body)

    const pessoa = {
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        sexo: req.body.sexo,
        datanascimento: req.body.datanascimento,
        numero: req.body.numero,
        status: req.body.status ? req.body.status : false
    };

    Pessoa.create(pessoa)
        .then(data => {
            // console.log("controller.pessoa", pessoa)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu um erro durante o cadastro."
            });
        });
};


exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

    Pessoa.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu um erro ao recuperar os cadastros."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Pessoa.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao recuperar o cadastro com o id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Pessoa.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "O cadastro foi excluído com sucesso!"
                });
            } else {
                res.send({
                    message: `Não é possível excluir o cadastro com id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não foi possível excluir o cadastro com o id=" + id
            });
        });
};

exports.findAllStatus = (req, res) => {
    Pessoa.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Houve um erro ao recuperar os cadastros."
            });
        });
};
