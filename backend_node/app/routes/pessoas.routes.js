module.exports = app => {
  const pessoa = require("../controllers/pessoa.controller.js");

  var router = require("express").Router();
  
  router.post("/", pessoa.create);

  router.get("/", pessoa.findAll);

  router.get("/status", pessoa.findAllStatus);

  router.get("/:id", pessoa.findOne);

  app.use('/api/pessoa', router);
};