module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuarios", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return Usuario;
};
