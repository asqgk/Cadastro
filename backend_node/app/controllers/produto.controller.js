const db = require("../models");
const Produto = db.produto;
const Op = db.Sequelize.Op;

// Crie um novo objeto
exports.create = (req, res) => {
  // Validando a requisição
  if (!req.body.nome) {
    res.status(400).send({
      message: "O conteúdo não pode estar vazio!"
    });
    return;
  }

  // Criando o Produto
  const produto = {
    nome: req.body.nome,
    descricao: req.body.descricao,
    status: req.body.status ? req.body.status : false
  };

  // Salvando o Produto no BD
  Produto.create(produto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao criar os produto."
      });
    });
};

// Recupere todos os Produto / encontre por título do banco de dados:
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Produto.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro ao recuperar os produtos."
      });
    });
};

// Recuperar um único objeto
exports.findOne = (req, res) => {
  const id = req.params.id;

  Produto.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao recuperar o produto com o id=" + id
      });
    });
};

// Atualizar um produto pelo id no request
exports.update = (req, res) => {
  const id = req.params.id;

  Produto.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Produto foi atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Cannot update Produto with id=${id}. Maybe Produto was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar os produto com id=" + id
      });
    });
};

// Delete a Produto with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Produto.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "O produto foi excluído com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível excluir o produto com id=${id}. Talvez o produto não tenha sido encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível excluir o produto com o id=" + id
      });
    });
};

// Deletar todos os produtos do banco de dados
exports.deleteAll = (req, res) => {
  Produto.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} produto were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all produtos."
      });
    });
};

// Procurar todos os produto status
exports.findAllStatus = (req, res) => {
  Produto.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving produtos."
      });
    });
};
