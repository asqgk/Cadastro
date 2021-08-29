module.exports = (sequelize, Sequelize) => {
  const TipoUsuario = sequelize.define("tipousuarios", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    tipo: {
      type: Sequelize.STRING
    }
  });

  return TipoUsuario;
};
