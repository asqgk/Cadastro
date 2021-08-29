const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, 
    {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.produto = require("./produto.model.js")(sequelize, Sequelize);
db.usuario = require("./usuario.model.js")(sequelize, Sequelize);
db.tipousuario = require("./tipousuario.model.js")(sequelize, Sequelize);
db.pessoa = require("./pessoa.model.js")(sequelize, Sequelize);

db.tipousuario.belongsToMany(db.usuario, {
  through: "usuario_tipousuario",
  foreignKey: "tipousuarioId",
  otherKey: "usuarioId"
});

db.usuario.belongsToMany(db.tipousuario, {
  through: "usuario_tipousuario",
  foreignKey: "usuarioId",
  otherKey: "tipousuarioId",
  as: "roles"
});

db.TIPOUSUARIOS = ["user", "admin", "moderator"];

module.exports = db;