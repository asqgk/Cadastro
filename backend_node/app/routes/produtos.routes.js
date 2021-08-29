module.exports = app => {
    const produto = require("../controllers/produto.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Produto
    router.post("/", produto.create);
  
    // Retrieve all produto
    router.get("/", produto.findAll);
  
    // Retrieve all status produto
    router.get("/status", produto.findAllStatus);
  
    // Retrieve a single Produto with id
    router.get("/:id", produto.findOne);
  
    // Update a Produto with id
    router.put("/:id", produto.update);
  
    // Delete a Produto with id
    router.delete("/:id", produto.delete);
  
    // Delete all Produto
    router.delete("/", produto.deleteAll);
  
    app.use('/api/produto', router);
  };

  