const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const produto = [];
// const addProduto = (nome, descricao, status) => {
//   produto.push({
//     nome: nome,
//     descricao: descricao,
//     status: status
//   });

//   return {
//     nome: nome,
//     descricao: descricao,
//     status: status
//   };
// }

// const getProdutos = () => {
//   return produto;
// };

const db = require("./app/models");
db.sequelize.sync();

const TipoUsuario = db.tipousuario;
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Francisco application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/usuarios.routes')(app);
require('./app/routes/produtos.routes')(app);
require('./app/routes/pessoas.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  TipoUsuario.create({
    id: 1,
    tipo: "user"
  });
 
  TipoUsuario.create({
    id: 2,
    tipo: "moderator"
  });
 
  TipoUsuario.create({
    id: 3,
    tipo: "admin"
  });
}

module.exports = app;

