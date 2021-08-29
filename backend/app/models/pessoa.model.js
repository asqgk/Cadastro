module.exports = (sequelize, Sequelize) => {
    const Pessoa = sequelize.define("pessoa", {
        nome: {
            type: Sequelize.STRING
        },
        sobrenome: {
            type: Sequelize.STRING
        },
        sexo: {
            type: Sequelize.STRING
        },
        datanascimento: {
            type: Sequelize.DATE
        },
        numero: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        }
    });

    return Pessoa;
};

